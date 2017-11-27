var common = {
  Volume: function (mp3Name, vol, tiem, boolean, callback) {// 音量大小
    if (!callback) {
      callback = Function;
    }
    if (boolean) {
      game.add
        .tween(mp3Name)
        .to({ volume: vol }, tiem, 'Linear', true)
        .onComplete.add(function () {
          callback();
        });
    } else {
      game.add
        .tween(mp3Name)
        .to({ volume: 0 }, tiem, 'Linear', true)
        .onComplete.add(function () {
          callback();
        });
    }
  },
  textImg: function (ele, i, callback) {
    var ele = game.add.image(game.world.width - 20 - 100 * i, 200, ele);
    ele.scale.set(0.28);
    ele.anchor.set(0.5);
    ele.alpha = 0;
    game.add
      .tween(ele)
      .to({ alpha: 1 }, 2000 + 200 * (i - 1), 'Linear', true)
      .onComplete.add(function () {
        callback();
      });
    return ele;
  },
  addMp3: function (name) { // 添加音乐
    var name = game.add.audio(name);
    name.play('', 0, 0);
    return name;
  },
  PrintText: function (textObj, content, callBack) { // 文字打印
    var i = 0;
    game.time.events.repeat(
      185,
      content.length,
      function () {
        i++;
        textObj.text = content.substr(0, i);
        if (callBack) {
          if (textObj.text.length == content.length) {
            callBack();
          }
        }
      },
      this
    );
  },
  ShowHide: function (obj, boolean, time, callBack) { // 显示隐藏
    if (!time) time = 1000;
    if (!callBack) callBack = Function
    if (boolean) {
      game.add
        .tween(obj)
        .to({ alpha: 1, visible: true }, time, 'Linear', true)
        .onComplete.add(function () {
          callBack()
        })
    } else {
      game.add
        .tween(obj)
        .to({ alpha: 0, visible: false }, time, 'Linear', true)
        .onComplete.add(function () {
          callBack()
        })
    }

  },
  AnchorScale: function (obj, X, Y, time, callBack) { // 位置 缩放
    if (!time) time = 1000
    if (!callBack) callBack = Function
    game.add
      .tween(obj)
      .to({ x: X, y: Y }, time, 'Linear', true)
      .onComplete.add(function () {
        callBack()
      })
  },
  Graphics: function () { // 创建方形
    var graphics = game.add.graphics(0, 0) // 创建
    graphics.beginFill(0x000000); // 背景颜色
    graphics.drawRect(0, 0, game.world.width, game.world.height) //创建方形
    graphics.alpha = 0
    graphics.endFill(); // 填充
    game.add.tween(graphics).to({ alpha: .6 }, 500, 'Linear', true)
    return graphics
  }
};
var mainState = function (game) {
  this.create = function () {
    var text1, text2, text3, text4, text5, text6, cxzj_mp3, children_mp3;
    var outer = game.add.image(0, 0, 'outer');
    // 音乐


    // 图片
    outer.scale.set(0.08);
    outer.anchor.set(0.5);
    outer.x = (game.world.width - outer.width) / 2 + outer.width / 2;
    outer.y = (game.world.height - outer.height) / 2 + outer.height / 2;

    setTimeout(function () {
      cxzj_mp3 = common.addMp3('cxzj_mp3');
      common.Volume(cxzj_mp3, 2, 6000, true);
      common.AnchorScale(outer.anchor, .51, .62, 24000)
      common.AnchorScale(outer.scale, .4, .4, 4000, function () {

        children_mp3 = common.addMp3('children_mp3');
        common.Volume(children_mp3, 2, 4000, true);
        // 显示文字
        text1 = common.textImg('text1', 1, function () {
          text2 = common.textImg('text2', 2, function () {
            text3 = common.textImg('text3', 3, function () {
              text4 = common.textImg('text4', 4, function () {
                text5 = common.textImg('text5', 5, function () {
                  common.Volume(children_mp3, 0, 3000, false);
                  text6 = common.textImg('text6', 6, function () {
                    var textArr = [text1, text2, text3, text4, text5, text6];
                    // 2s后文字隐藏
                    for (var i = 0; i < textArr.length; i++) {
                      var e = textArr[i];
                      common.ShowHide(e, false)
                    }
                    common.Volume(cxzj_mp3, 0, 4000, false);
                  });
                });
              });
            });
          });
        });
        common.AnchorScale(outer.scale, .8, .8, 15000, function () {
          common.AnchorScale(outer.scale, 1.3, 1.3, 2000, function () {
            common.AnchorScale(outer.scale, 4, 4, 2000)
            common.ShowHide(outer, false, 2000, function () {
              cxzj_mp3.stop();
              children_mp3.stop();
              game.state.add('content', contentState);
              game.state.start('content');
            });
          });
        });
      }, this);
    }, 0);
  };
};
var contentState = function (game) {
  this.create = function () {
    var img = game.add.image(0, 0, 'content'),
      talk_mp3 = game.add.audio('talk_mp3'),
      smoke = game.add.sprite(-40, -15, 'smoke'),
      flag = game.add.sprite(-20, -199, 'flag'),
      lamp1 = game.add.sprite(296, -466, 'lamp1'),
      lamp2 = game.add.sprite(-346, -77, 'lamp2'),
      imgH = (game.world.width - img.width) / 2 + img.width / 2,
      imgW = (game.world.height - img.height) / 2 + img.height / 2;
    flag.animations.add('flag', [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 0])
    flag.animations.play('flag', 5, true)
    smoke.animations.add('smoke', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
    smoke.animations.play('smoke', 8, true)
    lamp1.animations.add('lamp1', [0, 1, 2, 3, 4, 5, 0, 3, 4, 1, 2])
    lamp1.animations.play('lamp1', 2, true)
    lamp2.animations.add('lamp2', [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 0])
    lamp2.animations.play('lamp2', 3, true)
    img.alpha = 0;
    talk_mp3.allowMultiple = false;
    talk_mp3.addMarker('talk1', 0, 1.6); // 客官里边请
    talk_mp3.addMarker('talk2', 1.85, 2.15); // 欢迎光临“江湖酒馆”
    talk_mp3.addMarker('talk3', 3.95, 6.7); // 啊，真是好酒啊，小二再来一壶
    talk_mp3.addMarker('talk4', 10.9, 3); //  好嘞，古越天纯一壶~
    talk_mp3.addMarker('talk5', 14, 15.8); // 大侠好品味
    talk_mp3.addMarker('talk6', 29.9, 8); // 嗳~要我说
    img.anchor.set(0.5);
    flag.anchor.set(0.5);
    smoke.anchor.set(0.5);
    lamp1.anchor.set(0.5);
    lamp2.anchor.set(0.5);
    img.x = imgH
    img.y = imgW
    img.addChild(flag)
    img.addChild(smoke)
    img.addChild(lamp1)
    img.addChild(lamp2)
    common.ShowHide(img, true, 1000, function () {
      talk_mp3.play('talk1');
      setTimeout(function () {// 进场动画
        game.add.tween(img.scale).to({ x: 1.1, y: 1.1 }, 300, 'Linear', true, 0, 0, true).onComplete.add(function () {
          setTimeout(function () { // 老板娘说话
            talk_mp3.play('talk2');
            setTimeout(function () { // 老板娘说话后
              common.AnchorScale(img.scale, 2.2, 2.2)
              // common.AnchorScale(img.anchor, 0.6, 0.45)
              common.AnchorScale(img, 161, 686)
              setTimeout(function () { // 侠客说话
                talk_mp3.play('talk3');
                setTimeout(function () {// 侠客说话后
                  common.AnchorScale(img, imgH, imgW)
                  common.AnchorScale(img.scale, 1, 1, '', function () {
                    setTimeout(function () {// 小二说话
                      talk_mp3.play('talk4');
                      // common.AnchorScale(img.anchor, .6, .5)
                      common.AnchorScale(img.scale, 1.5, 1.5)
                      common.AnchorScale(img, 267, 601)
                      setTimeout(function () {// 小二说话
                        var graphics = common.Graphics()
                        var text_bg = game.add.image(-40, 0, 'text_bg');
                        var xiaoer = game.add.image(352, 706, 'xiaoer');
                        xiaoer.scale.set(2.2, 2.2)
                        text_bg.scale.set(1.4, 1.4)
                        text_bg.alpha = 0
                        xiaoer.alpha = 0
                        common.ShowHide(xiaoer, true, 500)
                        common.ShowHide(text_bg, true, 500, function () {
                          talk_mp3.play('talk5');
                          // var content = `大侠好品味，您闻这古越\n龙山【天纯】的酒色——\n纯净清爽，细呷一口入喉\n——润和自然。倾心酿制\n零添加，再无三高痛风之\n虞！实乃大侠您行走江湖\n必备之佳品！`
                          // var content = `11`;
                          var content = `大侠好品味。\n您闻这古越龙山\n【天纯】的酒色，\n纯净清爽，\n细呷一口入喉，\n润和自然。\n倾心酿制零添加，\n再无山高通峰之虞！\n实乃大侠您行走\n江湖必备之佳品！`;
                          var text = game.add.text(210, 149, '', { fontSize: '26px', fill: '#000', fontWeight: '400', });
                          text_bg.addChild(text)
                          text.lineSpacing = 20
                          common.PrintText(text, content, function () { // 文字打完
                            setTimeout(function () {
                              common.ShowHide(xiaoer, false)
                              common.ShowHide(text_bg, false)
                              common.ShowHide(graphics, false, 500, function () {
                                common.AnchorScale(img, imgH, imgW)
                                common.AnchorScale(img.scale, 1, 1, '', function () {
                                  setTimeout(function () { // 老板娘说话
                                    talk_mp3.play('talk6');
                                  }, 500);//1000
                                  common.AnchorScale(img, 825, 740, 1500)
                                  common.AnchorScale(img.scale, 2.2, 2.2, 1500, function () {
                                    setTimeout(function () {
                                      game.add.tween(graphics).to({ alpha: .6, visible: true }, 500, 'Linear', true)
                                      var notice = game.add.image(0, 30, 'notice');
                                      var cha = game.add.image(0, 1060, 'cha')
                                      notice.scale.set(1.2)
                                      notice.x = (game.world.width - notice.width) / 2
                                      cha.x = (game.world.width - cha.width) / 2
                                      notice.alpha = 0
                                      cha.alpha = 0
                                      common.ShowHide(notice, true)
                                      common.ShowHide(cha, true)
                                      cha.inputEnabled = true;
                                      cha.events.onInputDown.add(function () {
                                        common.ShowHide(notice, false)
                                        common.ShowHide(cha, false)
                                        common.ShowHide(graphics, false, 1000, function () {
                                          // graphics.destroy()
                                          common.AnchorScale(img, imgH, imgW)
                                          common.AnchorScale(img.scale, 1, 1)
                                        });
                                        setTimeout(function () {
                                          //老板娘按钮
                                          var click1 = game.add.button(68, 511, 'click', function () {
                                            game.add.tween(graphics).to({ alpha: .6, visible: true }, 500, 'Linear', true)
                                            var cha1 = game.add.image(0, 1060, 'cha')
                                            cha1.x = (game.world.width - cha1.width) / 2
                                            cha1.alpha = 0
                                            cha1.inputEnabled = true;
                                            common.ShowHide(notice, true, 500)
                                            common.ShowHide(cha1, true, 500)
                                            notice.bringToTop()
                                            cha1.events.onInputDown.add(function () {
                                              common.ShowHide(notice, false, 500)
                                              common.ShowHide(cha1, false, 500)
                                              common.ShowHide(graphics, false, 500)
                                            })
                                          }, this, 0, 0, 0, 0)
                                          click1.scale.set(1.5)
                                          click1.animations.add('click', [0, 1, 2, 3, 4])
                                          click1.play('click', 5, true)
                                          // 小二按钮
                                          var click2 = game.add.button(486, 439, 'click', function () {
                                            game.add.tween(graphics).to({ alpha: .6, visible: true }, 500, 'Linear', true)
                                            var cha2 = game.add.image(0, 1060, 'cha')
                                            cha2.x = (game.world.width - cha2.width) / 2
                                            text_bg.scale.set(1.2)
                                            text_bg.x = (game.world.width - text_bg.width) / 2
                                            text_bg.y = 30
                                            cha2.alpha = 0
                                            cha2.inputEnabled = true;
                                            text_bg.bringToTop()
                                            common.ShowHide(text_bg, true, 500)
                                            common.ShowHide(cha2, true, 500)
                                            cha2.events.onInputDown.add(function () {
                                              common.ShowHide(graphics, false, 500)
                                              common.ShowHide(text_bg, false, 500)
                                              common.ShowHide(cha2, false, 500)
                                            })
                                          }, this, 0, 0, 0, 0)
                                          click2.scale.set(1.5)
                                          click2.animations.add('click', [0, 1, 2, 3, 4])
                                          click2.play('click', 5, true)
                                        }, 2200); // 2200
                                      }, this);
                                    }, 6500);//6500
                                  })
                                });
                              });
                            }, 1000);//1000
                          });
                        });
                      }, 3200); //3200 
                    }, 500); //500
                  });
                }, 7000); //7000
              }, 500); //500
            }, 2500); //2500
          }, 500);//500
        });
      }, 500);//500
    });
  };
};
