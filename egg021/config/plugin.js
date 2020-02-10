'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  validate:{ //开启插件
    enable:true,
    package:'egg-validate'
  },
  mysql : {
    enable: true,
    package: 'egg-mysql',
  }
};
