﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using WebApiToTypeScript.Block;

namespace WebApiToTypeScript.Views
{
    public class ViewsService : ServiceAware
    {
        public IEnumerable<ViewsBlock> GetBlocksForViews()
        {
            foreach (var viewConfig in Config.ViewConfigs)
            {
                var featureViews = new List<ViewNode>();

                var viewsBlock = CreateViewsBlock(viewConfig.Namespace);
                AddViewsFromDirectory(viewConfig.SourceDirectory, featureViews);
                WriteViewsToBlock(featureViews, viewsBlock);

                yield return new ViewsBlock
                {
                    TypeScriptBlock = viewsBlock,
                    Filename = viewConfig.OutputFilename
                };
            }
        }

        public TypeScriptBlock CreateViewsBlock(string namespaceName)
        {
            return new TypeScriptBlock($"{Config.NamespaceOrModuleName} {namespaceName}");
        }

        public TypeScriptBlock WriteViewsToBlock(List<ViewNode> featureViews, TypeScriptBlock viewsBlock)
        {
            foreach (var featureView in featureViews)
            {
                WriteViewEntry(viewsBlock, featureView);
            }

            return viewsBlock;
        }

        public void AddViewsFromDirectory(string sourceDirectory, List<ViewNode> featureViews)
        {
            var viewsSourceDirectory = Path.GetFullPath(sourceDirectory);

            var viewFiles = Directory.GetFiles(viewsSourceDirectory, $"*{Config.ViewsPattern}*", SearchOption.AllDirectories);

            foreach (var viewFile in viewFiles)
            {
                var featureViewPath = Path.GetFullPath(viewFile)
                    .Split(new[] { $@"{viewsSourceDirectory}\" }, StringSplitOptions.RemoveEmptyEntries)
                    .Last();

                var parts = featureViewPath
                    .Split(new[] { @"\" }, StringSplitOptions.RemoveEmptyEntries);

                var namespaces = parts
                    .Take(parts.Length - 1)
                    .Select(Helpers.ToPascalCaseFromKebabCase)
                    .ToList();

                var featureNamespace = namespaces.First();

                if (featureViews.All(v => v.Name != featureNamespace))
                {
                    featureViews.Add(new ViewNode
                    {
                        Name = featureNamespace
                    });
                }

                var subFeatures = namespaces
                    .Skip(1)
                    .ToList();

                var viewNode = featureViews.Single(v => v.Name == featureNamespace);
                var parentFolderName = subFeatures.LastOrDefault() ?? featureNamespace;

                foreach (var subFeature in subFeatures)
                {
                    var doesViewNodeHasSubFeature = viewNode.ChildViews
                        .Any(v => v.Name == subFeature);

                    if (!doesViewNodeHasSubFeature)
                    {
                        var subFeatureNode = new ViewNode
                        {
                            Name = subFeature
                        };

                        viewNode.ChildViews.Add(subFeatureNode);
                    }

                    viewNode = viewNode.ChildViews
                        .Single(v => v.Name == subFeature);
                }

                var fullViewNameInKebabCase = parts
                    .Last()
                    .Split(new[] { Config.ViewsPattern }, StringSplitOptions.RemoveEmptyEntries)
                    .First();

                var fullViewNameInPascalCase = Helpers.ToPascalCaseFromKebabCase(fullViewNameInKebabCase);

                var viewName = fullViewNameInPascalCase != parentFolderName
                    ? Regex.Replace(fullViewNameInPascalCase, $"^{parentFolderName}", string.Empty)
                    : fullViewNameInPascalCase;

                viewNode.ViewEntries.Add(new ViewEntry
                {
                    Name = viewName,
                    Path = featureViewPath.Replace(@"\", "/")
                });
            }
        }

        private void WriteViewEntry(TypeScriptBlock viewsBlock, ViewNode featureViewNode, bool isChild = false)
        {
            var viewNamespace = Config.UseViewsGroupingNamespace && !isChild
                ? ".Views"
                : string.Empty;

            var featureBlock = viewsBlock
                .AddAndUseBlock($"export namespace {featureViewNode.Name}{viewNamespace}");

            foreach (var viewEntry in featureViewNode.ViewEntries)
            {
                featureBlock
                    .AddStatement($"export const {viewEntry.Name} = '{viewEntry.Path}';");
            }

            foreach (var childView in featureViewNode.ChildViews)
            {
                WriteViewEntry(featureBlock, childView, isChild: true);
            }
        }
    }
}