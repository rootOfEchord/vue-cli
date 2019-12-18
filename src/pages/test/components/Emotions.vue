<template>
    <div id="app">
        <p>&#x1f62c;</p>
        <!-- <img src="/ue415" alt=""> -->
        <!-- <VueEmoji @input="onInput" :value="myText"/> -->
        <!-- <div class="msg-item">
            <div v-for="(item, index) in list" :key="index" v-html="replaceURLWithHTMLLinks(item)">
			</div>
        </div>-->
        <!-- <div v-html="Emoji.unifiedToHTML('😎')"></div> -->
        <div
			ref="textarea"
			id="text"
            v-html="test"
            contenteditable="true"
            style="width:200px;height: 60px"
			@focus="openRage"
        ></div>
		<button @click="aa">添加表情</button>
    </div>
</template>

<script>
    import VueEmoji from 'emoji-vue'
    import Emoji from 'emoji'
    import twemoji from 'twemoji'
    import {debuglog} from 'util';

    export default {
        name: 'Demo',
        data() {
            return {
                myText: 'jiangjin',
                list: [
                    '请访问 https://shershen08.github.io/emoji-vue/',
                    'welcome to web: https://www.cnblogs.com/rainheader/p/4595323.html 点击可访问',
                    'click view the Website https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E6%AD%A3%E5%88%99%E5%8C%B9%E9%85%8D%E7%BD%91%E5%9D%80&oq=emoji%2520%25E7%25BC%2596%25E7%25A0%2581%25E5%2589%258D%25E7%25AB%25AF%25E5%25B1%2595%25E7%25A4%25BA&rsv_pq=9c60ae89000280fa&rsv_t=f3d52VErBXhLLQojwGai7wPSya6MHHhdO%2BUd8CXI7pEDw%2FHzpKq%2FKu18vm8&rqlang=cn&rsv_enter=1&inputT=15049&rsv_sug1=380&rsv_sug7=101&rsv_sug3=351&bs=emoji%20%E7%BC%96%E7%A0%81%E5%89%8D%E7%AB%AF%E5%B1%95%E7%A4%BA'

                ],
                Emoji,
                test: twemoji.parse('I 😎 emoji!')
            }
        },
        computed: {
            fliteList() {
                return this.list.map((item, index) => {
                    return ({

                    })
                })
            },
        },
        methods: {
			openRage() {
				const aa = window.getSelection().getRangeAt(0)
				console.log('document.createRange()', aa)	
			},
            aa() {
				// this.test = this.$refs.textarea.innerHTML + '😎'
				const text = document.querySelector('#text')
				// this.setFocus(text)
				this.openRage()
				text.focus()
				// window.getSelection().getRangeAt(0).setEnd()
            },
            onInput(event) {
                //event.data contains the value of the textarea
                console.log('event', event)
                console.log('😎', Emoji.unifiedToHTML('😎'));
            },
            replaceURLWithHTMLLinks(text) {
                var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i
                return text.replace(exp, "<a href='$1' target='_black'>$1</a>")
            },
            keepLastIndex(obj) {   // obj 为可编辑 的div  移动端的就没做低版本的兼容
                if (window.getSelection) {
                    let range = window.getSelection()// 创建range
                    range.selectAllChildren(obj)// range 选择obj下所有子内容
                    range.collapseToEnd()// 光标移至最后
                }
            },
            setFocus(el) {
                el.focus();
                // var range = document.createRange();
                // range.selectNodeContents(el);
                // range.collapse(false);
                // var sel = window.getSelection();
                // //判断光标位置，如不需要可删除
                // if (sel.anchorOffset != 0) {
                //     return;
                // };
                // sel.removeAllRanges();
                // sel.addRange(range);
            },
            set_text_value_position(obj, spos) {
                var tobj = obj
                if (spos < 0)
                    spos = tobj.innerHTML.length;
                if (tobj.setSelectionRange) { //兼容火狐,谷歌
                    setTimeout(function () {
                        tobj.setSelectionRange(spos, spos);
                        tobj.focus();                    }
                        , 100);
                } else if (tobj.createTextRange) { //兼容IE
                    var rng = tobj.createTextRange();
                    rng.move('character', spos);
                    rng.select();
                }
            }
        },
        components: {
            VueEmoji
        }
    }
</script>