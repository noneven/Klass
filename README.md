## Klass
JavaScript class and inheritance

### 主要API

1、Klass.extend 

2、链式调用
```javascript
var Base = Klass.extend({
    init: function(option){
        this.initOptions()
        this.initEvents();
    },
    initOptions: function(){},
    initEvents: function(){}
});
var MyComponent = Base.extend({
    init: function(){};
    //...
});
```
3、实例化
```javascript
var MyInstance = new MyComponent(opts);
var MyInstance = MyComponent(opts);
```
