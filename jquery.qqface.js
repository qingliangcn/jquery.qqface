!(function(arr, insertText, position, getData) {

    $.extend({
        qqface: function(opt) {
            var div = $('<div class="jquery-qqface"><div class="jquery-qqface-layer"></div></div>');
            var span = $('<div class="jquery-qqface-span"></div>');
            var pos = {};

            div.find('.jquery-qqface-layer').append(span);
            $('body').append(div);

            //表情层事件
            div
                .on('mousemove', '.jquery-qqface-layer', function(e) {
                    pos = getData(arr, e.offsetX, e.offsetY);
                    span.show().text(pos.text).css({
                        backgroundImage: 'url(' + opt.imgPath + pos.name + '.gif)',
                        left: pos.x * 27 - 13,
                        top: pos.y * 27 - 55,
                    });
                })
                .on('mouseout', '.jquery-qqface-layer', function() {
                    span.hide();
                })
                .on('click', '.jquery-qqface-layer', function() {
                    insertText(opt.textarea[0], pos.code);
                    div.hide();
                });

            //点击打开表情层
            opt.handle.on('click', function(e) {
                div.show();
                position(opt.handle, div);
                e.stopPropagation();
            });

            //空白处点击，关闭表情层
            $(document).on('click', function() {
                div.hide();
            });
        }
    });

}(
    //返回配置
    [
        ["weixiao", "微笑"],
        ["piezui", "撇嘴"],
        ["se", "色"],
        ["fadai", "发呆"],
        ["deyi", "得意"],
        ["liulei", "流泪"],
        ["haixiu", "害羞"],
        ["bizui", "闭嘴"],
        ["shui", "睡"],
        ["daku", "大哭"],
        ["ganga", "尴尬"],
        ["fanu", "发怒"],
        ["tiaopi", "调皮"],
        ["ciya", "呲牙"],
        ["jingya", "惊讶"],
        ["nanguo", "难过"],
        ["ku", "酷"],
        ["lenghan", "冷汗"],
        ["zhuakuang", "抓狂"],
        ["tu", "吐"],
        ["touxiao", "偷笑"],
        ["keai", "可爱"],
        ["baiyan", "白眼"],
        ["aoman", "-傲慢"],
        ["jie", "饥饿"],
        ["kun", "困"],
        ["jingkong", "惊恐"],
        ["liuhan", "流汗"],
        ["hanxiao", "憨笑"],
        ["dabing", "大兵"],
        ["fendou", "奋斗"],
        ["zhouma", "咒骂"],
        ["yiwen", "疑问"],
        ["xu", "嘘"],
        ["yun", "晕"],
        ["zhemo", "折磨"],
        ["shuai", "衰"],
        ["kulou", "骷髅"],
        ["qiaoda", "敲打"],
        ["zaijian", "再见"],
        ["cahan", "擦汗"],
        ["koubi", "抠鼻"],
        ["guzhang", "鼓掌"],
        ["qiudale", "糗大了"],
        ["huaixiao", "坏笑"],
        ["zuohengheng", "左哼哼"],
        ["youhengheng", "右哼哼"],
        ["haqian", "哈欠"],
        ["bishi", "鄙视"],
        ["weiqu", "委屈"],
        ["kuaikule", "快哭了"],
        ["yinxian", "阴险"],
        ["qinqin", "亲亲"],
        ["xia", "吓"],
        ["kelian", "可怜"],
        ["caidao", "菜刀"],
        ["xigua", "西瓜"],
        ["pijiu", "啤酒"],
        ["lanqiu", "篮球"],
        ["pingpang", "乒乓"],
        ["kafei", "咖啡"],
        ["fan", "饭"],
        ["zhutou", "猪头"],
        ["meigui", "玫瑰"],
        ["diaoxie", "凋谢"],
        ["shiai", "示爱"],
        ["aixin", "爱心"],
        ["xinsui", "心碎"],
        ["dangao", "蛋糕"],
        ["shandian", "闪电"],
        ["zhadan", "炸弹"],
        ["dao", "刀"],
        ["zuqiu", "足球"],
        ["piaochong", "瓢虫"],
        ["bianbian", "便便"],
        ["yueliang", "月亮"],
        ["taiyang", "太阳"],
        ["liwu", "礼物"],
        ["yongbao", "拥抱"],
        ["qiang", "强"],
        ["ruo", "弱"],
        ["woshou", "握手"],
        ["shengli", "胜利"],
        ["baoquan", "抱拳"],
        ["gouyin", "勾引"],
        ["quantou", "拳头"],
        ["chajin", "差劲"],
        ["aini", "爱你"],
        ["no", "NO"],
        ["ok", "OK"]
    ],

    //向text插入内容
    function(obj, str) {
        if (document.selection) {
            var sel = document.selection.createRange();
            sel.text = str;
        } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
            var startPos = obj.selectionStart,
                endPos = obj.selectionEnd,
                cursorPos = startPos,
                tmpStr = obj.value;
            obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
            cursorPos += str.length;
            obj.selectionStart = obj.selectionEnd = cursorPos;
        } else {
            obj.value += str;
        }
    },

    //控制按钮和层，控制位置
    function(handle, div) {

        var win = $(window);
        var left = handle.offset().left;
        var top = handle.offset().top;
        var width = handle.outerWidth();
        var height = handle.outerHeight();

        var wWidth = win.width();
        var wHeight = win.height();

        var dLeft;
        var dTop;

        if (left + div.outerWidth() < wWidth) {
            dLeft = left;
        } else {
            var right = wWidth - left - width;
            dLeft = wWidth - right - div.outerWidth();;
        }

        if (top + div.outerHeight() < wHeight) {
            dTop = top + height;
        } else {
            dTop = top - div.outerHeight();
        }

        div.css({
            left: dLeft,
            top: dTop
        });
    },

    //要据x,y返回想要的数据
    function(arr, x, y) {
        x = Math.min(Math.floor(x / 27), 14);
        y = Math.min(Math.floor(y / 27), 5);

        var index = y * 15 + x;

        return {
            x: x,
            y: y,
            index: index,
            name: arr[index][0],
            code: '[face:' + arr[index][0] + ']',
            text: arr[index][1]
        };
    }
));