var arr = [
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
];


var tpl = '<div class="jquery-qqface"><div class="jquery-qqface-layer"></div></div>';
var span = $('<div class="jquery-qqface-span"></div>');

$.extend({



    qqface: function(opt) {


        var div = $(tpl);


        $('body').append(div);

        var textarea = opt.textarea;
        var handle = opt.handle;
        var pos = {};



        div.on('mousemove', '.jquery-qqface-layer', function(e) {

            pos = getPos(e.offsetX, e.offsetY);

            span
                .show()
                .text(pos.text)
                .css({
                    backgroundImage: 'url(gif/' + pos.name + '.gif)',
                    left: pos.x * 27 + 'px',
                    top: (pos.y * 27 + 90) + 'px',
                })
                .appendTo(div);



        });

        div.on('mouseout', '.jquery-qqface-layer', function() {
            span.hide();
        });


        div.on('click', '.jquery-qqface-layer', function() {
            insertText(textarea[0], pos.code);
            div.hide();
        });


        handle.on('click', function(e) {
            div.show();
            e.stopPropagation();
        });


        $(document).on('click', function() {
            div.hide();
        });


        function getPos(x, y) {
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


        function insertText(obj, str) {
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
        }

    }
});