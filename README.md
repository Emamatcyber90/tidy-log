#Tidy Log

Under construction...

[![build status][travis-ci-build-status-img]][travis-ci-url]

Helper to manage your `console.log()` in your browsers.

##Features

* Small file and low overhead
* Provide extra information for debug
* Log manager
* Extra log style 
* Browsers compatility

##Usage

<!-- __options__:

Boolean `showTimeLabel`

Default by `true`. Setting as `false` will stop showing time information in later logging.
 -->
##Api

####tidyLog.config([options])

Config the default options.

```js
tidyLog.config({
  showTimeLabel:false
});

var logger = tidyLog.create();

logger.log('Log without time label');
```

__options__

* showTimeLabel(default by `true`)
* showPath(default by `true`)
* display(default by `true`)
* disable(default by `false`)
* recordLog(default by `false`)

####tidyLog.create([options])

Initialize a new `Logger` with given options.

####Group.log()

Create a new log in `this` group.

####Group.getLogs()

Get logs that created in `this` group.

####Group.logHistory()

Recall `console.log` in all logs created by `this` group.

__Note__: You have to set `recordLog` as `true` if you want to use `logHistory()`.

```js
var logger = tidyLog.create({
  recordLog:true
});

logger.log('first log');//log '[21:16:54] first log'
logger.log('second log');//log '[21:16:54] second log'

logger.logHistory();
//log '[21:16:54] first log' and '[21:16:54] second log'
```
####Group.getGroups()

Get an array of child groups in `this` groups.

####Group.group(name)

Create a child group so that you can manage this kind of logs later.

```js
var appLogger = tidyLog.create();

var xhrLogger = appLogger.group('xhr');

xhrLogger.log('start sending request...');

//...

xhrLogger.log('success');
```

##Test

Command `karma run`.

##License

[MIT](LICENSE)

[travis-ci-build-status-img]:https://travis-ci.org/oyyd/tidy-log.svg?branch=master
[travis-ci-url]:https://travis-ci.org/oyyd/tidy-log