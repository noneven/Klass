
var Klass = function () {
	var _mixin = function (b, e) {
    for (var k in e) {
      e.hasOwnProperty(k) && (b[k] = e[k])
    }
  };
  var _args2str = function (obj) {
    switch (typeof (obj)) {
      case 'object':
        var ret = [];
        if (obj instanceof Array) {
          for (var i = 0, len = obj.length; i < len; i++) {
            ret.push(arguments.callee(obj[i]));
          }
          return '[' + ret.join(',') + ']';
        } else if (obj instanceof RegExp) {
          return obj.toString();
        } else {
          for (var a in obj) {
            ret.push(a + ':' + arguments.callee(obj[a]));
          }
          return '{' + ret.join(',') + '}';
        } 
      case 'string':
        return "\"" + obj.replace(/(\\|\")/g, "\\$1")
          .replace(/\n|\r|\t/g, function (a) {
          return ("\n" == a) ? "\\n" : ("\r" == a) ? "\\r" : ("\t" == a) ? "\\t" : "";
        }) + "\"";
      default:
        return obj.toString();
    }
  },
  // 模拟extend继承方式
  var _extend = function () {
    // 开关,为了在继承的时候不调用父类的init方法渲染，而把渲染放在子类
    this.TODOinit = false;
    //原型赋值
    var proto = new this;
    this.TODOinit = true;

    var args = [].slice.call(arguments);
    var len = args.length;

    // for循环是为了实现多个继承,例如Base.extend(events,com)
    for (var i = 0; i < len; i++) {
      _mixin(proto, args[i].prototype || args[i])
    }

    // 继承后返回的子类
    var SubKlass = function () {

      var argstr = '';
      for (var i = 0; i < arguments.length; i++) {
        argstr += _args2str(arguments[i]) + ","
      }
      argstr = argstr.substring(0, argstr.length - 1);

      var isNew = this instanceof arguments.callee, isInit;
      if (!isNew) {
        return eval("new arguments.callee(" + argstr + ")");
      } else {
        isInit = (SubKlass.TODOinit && this.init)
        if (isInit) {
          this.init.apply(this, arguments)
          return this
        }
      }
    };
    // 继承静态方法
    _mixin(SubKlass, this);
    // 把混入之后的属性和方法赋值给子类完成继承
    SubKlass.prototype = proto;
    SubKlass.prototype.constructor = SubKlass;
    // 给子类页也添加继承方法,子类也可以继续继承
    SubKlass.extend = arguments.callee;
    return SubKlass
  };
  var Klass = function () { };
  Klass.extend = _extend;
  return Klass
} ();
