var device = (function(win,doc) {

    var i,
        o,
        obj        = {},
        methods    = {},
        user_agent = win.navigator.userAgent.toLowerCase(),
        ios        = 'ios',
        iphone     = 'iphone',
        ipad       = 'ipad',
        ipod       = 'ipod',
        android    = 'android',
        mobile     = 'mobile',
        blackberry = 'blackberry',
        tablet     = 'tablet',
        desktop    = 'desktop',
        windows    = 'windows',
        phone      = 'phone',
        touch      = 'touch',

        androidPhone    = 'androidPhone',
        blackberryPhone = 'blackberryPhone',
        windowsPhone    = 'windowsPhone',

        androidTablet    = 'androidTablet',
        blackberryTablet = 'blackberryTablet',
        windowsTablet    = 'windowsTablet';


    obj[ipod]               = [ipod];
    obj[ipad]               = [ipad];
    obj[windows]            = [windows];

    obj[iphone]             = ['!',windows,'&&',iphone];
    obj[ios]                = [iphone,'||',ipod,'||',ipad];

    obj[android]            = ['!',windows,'&&',android];
    obj[blackberry]         = [blackberry,'||','bb10','||', 'rim'];

    obj[androidPhone]       = [android,'&&',mobile];
    obj[androidTablet]      = [android,'&&','!',mobile];

    obj[blackberryPhone]    = [blackberry,'&&','!',tablet];
    obj[blackberryTablet]   = [blackberry,'&&',tablet];

    obj[windowsPhone]       = [windows,'&&',phone];
    obj[windowsTablet]      = [windows,'&&','(',touch,'&&','!',windows,'&&','!',phone];

    obj[mobile]             = [androidPhone,'||',iphone,'||',ipod,'||',windowsPhone,'||',blackberryPhone];
    obj[tablet]             = [ipad,'||',androidTablet,'||',blackberryTablet,'||',windowsTablet];
    obj[desktop]            = ['!',tablet,'&&','!',mobile];


    function find(needle) {
        return user_agent.indexOf(needle) !== -1;
    }

    function evil(fn) {
        return new Function('return ' + fn)();
    }



    for(i in obj) {
        if(obj.hasOwnProperty(i)){
            o = obj[i];

            methods[i] = (function(obj,find,evil) {
                var i,
                    o2,
                    as = '';
                for(i in obj) {
                    if(obj.hasOwnProperty(i)){
                        o2 = obj[i];
                        if (
                            o2 == '!'  ||
                            o2 == '&&' ||
                            o2 == '||' ||
                            o2 == '('  ||
                            o2 == ')'
                        ) {
                            as += o2;
                        } else {
                            as += find(o2);
                        }
                    }

                }

                return function() {
                    return evil(as);
                };
            })(o,find,evil)
        }
    }

    return methods;

})(window, document);
