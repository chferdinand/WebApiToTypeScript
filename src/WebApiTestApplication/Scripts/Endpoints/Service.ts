namespace Endpoints {
    export class AngularEndpointsService {
        static $inject = ['$http', '$q'];
        static $http: ng.IHttpService;
        static $q: ng.IQService;
        static endpointCache = {};
    
        constructor($http: ng.IHttpService, $q: ng.IQService) {
            AngularEndpointsService.$http = $http;
            AngularEndpointsService.$q = $q;
        }
    
        static call<TView>(endpoint: IEndpoint, data, httpConfig?: angular.IRequestShortcutConfig) {
            const config =  {
                method: endpoint._verb,
                url: endpoint.toString(),
                data: data
            }
        
            httpConfig && _.extend(config, httpConfig);
            
            const call = AngularEndpointsService.$http<TView>(config);
            return call.then(response => response.data);
        }
    
        static callCached<TView>(endpoint: IEndpoint, data, httpConfig?: angular.IRequestShortcutConfig) {
            var cacheKey = endpoint.toString();
        
            if (this.endpointCache[cacheKey] == null) {
                return this.call<TView>(endpoint, data, httpConfig).then(result => {
                    this.endpointCache[cacheKey] = result;
                    return this.endpointCache[cacheKey];
                });
            }
        
            const deferred = this.$q.defer();
            deferred.resolve(this.endpointCache[cacheKey]);
            return deferred.promise;
        }
    
        public Test: Endpoints.Test.ITestService = {
            Get: (args: Endpoints.Test.IGet): Endpoints.Test.IGetWithCall => {
                var endpoint = new Endpoints.Test.Get(args);
                return _.extendOwn(endpoint, {
                    call(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.call<string[]>(this, null, httpConfig);
                    },
                
                    callCached(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.callCached<string[]>(this, null, httpConfig);
                    }
                });
            },
        
            Get1: (args: Endpoints.Test.IGet1): Endpoints.Test.IGet1WithCall => {
                var endpoint = new Endpoints.Test.Get1(args);
                return _.extendOwn(endpoint, {
                    call(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.call<string>(this, null, httpConfig);
                    },
                
                    callCached(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.callCached<string>(this, null, httpConfig);
                    }
                });
            },
        
            GetSomething: (args: Endpoints.Test.IGetSomething): Endpoints.Test.IGetSomethingWithCall => {
                var endpoint = new Endpoints.Test.GetSomething(args);
                return _.extendOwn(endpoint, {
                    call(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.call<string>(this, null, httpConfig);
                    },
                
                    callCached(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.callCached<string>(this, null, httpConfig);
                    }
                });
            },
        
            GetSomethingElse: (args: Endpoints.Test.IGetSomethingElse): Endpoints.Test.IGetSomethingElseWithCall => {
                var endpoint = new Endpoints.Test.GetSomethingElse(args);
                return _.extendOwn(endpoint, {
                    call(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.call<string>(this, null, httpConfig);
                    },
                
                    callCached(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.callCached<string>(this, null, httpConfig);
                    }
                });
            },
        
            GetEnumerableString: (args: Endpoints.Test.IGetEnumerableString): Endpoints.Test.IGetEnumerableStringWithCall => {
                var endpoint = new Endpoints.Test.GetEnumerableString(args);
                return _.extendOwn(endpoint, {
                    call(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.call<string[]>(this, null, httpConfig);
                    },
                
                    callCached(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.callCached<string[]>(this, null, httpConfig);
                    }
                });
            },
        
            GetIHttpActionResult: (args: Endpoints.Test.IGetIHttpActionResult): Endpoints.Test.IGetIHttpActionResultWithCall => {
                var endpoint = new Endpoints.Test.GetIHttpActionResult(args);
                return _.extendOwn(endpoint, {
                    call<TView>(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.call<TView>(this, null, httpConfig);
                    },
                
                    callCached<TView>(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.callCached<TView>(this, null, httpConfig);
                    }
                });
            },
        
            GetVoidTask: (args: Endpoints.Test.IGetVoidTask): Endpoints.Test.IGetVoidTaskWithCall => {
                var endpoint = new Endpoints.Test.GetVoidTask(args);
                return _.extendOwn(endpoint, {
                    call(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.call<void>(this, null, httpConfig);
                    },
                
                    callCached(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.callCached<void>(this, null, httpConfig);
                    }
                });
            },
        
            GetStringTask: (args: Endpoints.Test.IGetStringTask): Endpoints.Test.IGetStringTaskWithCall => {
                var endpoint = new Endpoints.Test.GetStringTask(args);
                return _.extendOwn(endpoint, {
                    call(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.call<string>(this, null, httpConfig);
                    },
                
                    callCached(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.callCached<string>(this, null, httpConfig);
                    }
                });
            },
        
            GetEnumerableStringTask: (args: Endpoints.Test.IGetEnumerableStringTask): Endpoints.Test.IGetEnumerableStringTaskWithCall => {
                var endpoint = new Endpoints.Test.GetEnumerableStringTask(args);
                return _.extendOwn(endpoint, {
                    call(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.call<string[]>(this, null, httpConfig);
                    },
                
                    callCached(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.callCached<string[]>(this, null, httpConfig);
                    }
                });
            },
        
            Post: (args: Endpoints.Test.IPost): Endpoints.Test.IPostWithCall => {
                var endpoint = new Endpoints.Test.Post(args);
                return _.extendOwn(endpoint, {
                    call(value: Interfaces.IDummyClass, httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.call<string>(this, value != null ? value : null, httpConfig);
                    },
                });
            },
        
            Post1: (args: Endpoints.Test.IPost1): Endpoints.Test.IPost1WithCall => {
                var endpoint = new Endpoints.Test.Post1(args);
                return _.extendOwn(endpoint, {
                    call(value: Interfaces.IDerivedClassWithShadowedProperty, httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.call<string>(this, value != null ? value : null, httpConfig);
                    },
                });
            },
        
            Post2: (args: Endpoints.Test.IPost2): Endpoints.Test.IPost2WithCall => {
                var endpoint = new Endpoints.Test.Post2(args);
                return _.extendOwn(endpoint, {
                    call(value: Interfaces.IDerivedClassWithAnotherShadowedProperty, httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.call<string>(this, value != null ? value : null, httpConfig);
                    },
                });
            },
        
            Put: (args: Endpoints.Test.IPut): Endpoints.Test.IPutWithCall => {
                var endpoint = new Endpoints.Test.Put(args);
                return _.extendOwn(endpoint, {
                    call(value: string, httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.call<string>(this, value != null ? `"${value}"` : null, httpConfig);
                    },
                });
            },
        
            Delete: (args: Endpoints.Test.IDelete): Endpoints.Test.IDeleteWithCall => {
                var endpoint = new Endpoints.Test.Delete(args);
                return _.extendOwn(endpoint, {
                    call(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.call<string>(this, null, httpConfig);
                    },
                });
            }
        }
    
        public Thingy: Endpoints.Thingy.IThingyService = {
            GetAll: (args?: Endpoints.Thingy.IGetAll): Endpoints.Thingy.IGetAllWithCall => {
                var endpoint = new Endpoints.Thingy.GetAll(args);
                return _.extendOwn(endpoint, {
                    call(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.call<string>(this, null, httpConfig);
                    },
                
                    callCached(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.callCached<string>(this, null, httpConfig);
                    }
                });
            },
        
            Get: (args: Endpoints.Thingy.IGet): Endpoints.Thingy.IGetWithCall => {
                var endpoint = new Endpoints.Thingy.Get(args);
                return _.extendOwn(endpoint, {
                    call(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.call<string>(this, null, httpConfig);
                    },
                
                    callCached(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.callCached<string>(this, null, httpConfig);
                    }
                });
            },
        
            Getty: (args: Endpoints.Thingy.IGetty): Endpoints.Thingy.IGettyWithCall => {
                var endpoint = new Endpoints.Thingy.Getty(args);
                return _.extendOwn(endpoint, {
                    call(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.call<string>(this, null, httpConfig);
                    },
                
                    callCached(httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.callCached<string>(this, null, httpConfig);
                    }
                });
            },
        
            Post: (args?: Endpoints.Thingy.IPost): Endpoints.Thingy.IPostWithCall => {
                var endpoint = new Endpoints.Thingy.Post(args);
                return _.extendOwn(endpoint, {
                    call(value: Interfaces.IMegaClass, httpConfig?: angular.IRequestShortcutConfig) {
                        return AngularEndpointsService.call<string>(this, value != null ? value : null, httpConfig);
                    },
                });
            }
        }
    }
}
