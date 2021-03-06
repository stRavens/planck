# Changelog

## 0.6.0 (8 July 2015) - Reflection update
 * **New Feature**
  * Added new module - Reflection. It used for work with any metadata in framework.
  * Added possibility to use @inject() with controller's methods.
  * Added AngularJS-like arguments parsing, so if no @inject() provided - method's params will be parsed and used for DI, so for now all params in controllers and routers are position-agnostic.
  * Added helpers for controller: @skipBefore() and @skipAfter(). They are used to prevent execution of corresponding @before() and @after() from entire inheritance chain.
 * **Internal**
  * All private metadata have changed from dashed properties (like ```__beforeHandlers```) to symbols from Reflection module
 * **Fix**
  * fixed @abstractMethodAsync(), now it correctly worked for non-static methods

## 0.5.0 (20 June 2015) - Middleware update
 * **New Feature**
  * Added helpers for http router: rawRouter (raw Express app for low-level actions)
  * Added possibility to pass Express middleware in App.use()
  * Added helpers for controller: @before() and @after(). They are used to specify middleware, used before and after controllers method execution.
  * Added @inject() helper http router's constructor. It resolves DI pattern for http router and will be used for DI in another classes in the future.

## 0.4.0 (2 June 2015)
 * **New Feature**
  * Added route helper for http router. It need to manualy define single route and bind it on method in provided controller.
 * **Fix**
  * Added put requests in http resource helper.
  * Fixed some cases where router returned 404 instead 501 if something missed in client code.

## 0.3.10 (31 May 2015)
 * **Fix**
  * Fixed npm package

## 0.3.0 (31 May 2015)
 * **New Feature**
  * Basic support of cli. First command available is planck app <appname>: it creates template for new planck app. For using cli planck should be installed global.
  * Added namespace for all 'public' classes in main planck file.
  * Added helpers for some usefull tasks, such as promissifying module to let use native node modules with async/await syntax.

## 0.2.0 (24 May 2015)
 * **New Feature**
  * Basic router functionality
  * Basic controller functionality
  * Basic view functionality

## 0.1.0 (13 April 2015)
 * **New Feature**
  * App entry point
  * Basic active record functionality
