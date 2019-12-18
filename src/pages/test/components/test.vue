<template>
    <div class="test">
        <div
            ref="textarea"
            id="text"
            v-html="test"
            :contenteditable="isInput"
            @keydown="key($event)"
            placeholder="Write a message (Enter to send)"
            style="width:200px;height: 60px"
            @focus="openRage"
        ></div>
        <button @click="aa">点我</button>
    </div>
</template>

<script>
    import twemoji from 'twemoji'

    export default {
        name: 'test',
        components: {

        },
        data() {
            return {
                test: 'Write a message (Enter to send)',
                isInput: false
            }
        },
        props: {

        },
        computed: {

        },
        methods: {
            key(e) {
                console.log('e', e)
                if (e.keyCode === 13) {
                    e.preventDefault()
                    alert('enter key is down')
                }
            },
            aa() {
                this.isInput = !this.isInput
                // const text = document.querySelector('#text')
                // console.log('this.getCursortPosition(text)', this.getCursortPosition(text))
                // text.focus()
                // setTimeout(() => {
                //     this.setCaretPosition(text, 0)
                // }, 0);
            },
            // 设置光标位置
            setCaretPosition(ctrl, pos) {
                //设置光标位置函数 
                if (ctrl.setSelectionRange) {
                    ctrl.focus();  // 获取焦点
                    ctrl.setSelectionRange(pos, pos);  // 设置选定区的开始和结束点
                }
                else if (ctrl.createTextRange) {
                    var range = ctrl.createTextRange();  // 创建选定区
                    range.collapse(true);                // 设置为折叠,即光标起点和结束点重叠在一起
                    range.moveEnd('character', pos);     // 移动结束点
                    range.moveStart('character', pos);   // 移动开始点
                    range.select();                      // 选定当前区域
                }
            },
            // 获取光标位置
            getCursortPosition(ctrl) {
                //获取光标位置函数 
                var CaretPos = 0;
                // IE Support
                if (document.selection) {
                    ctrl.focus(); // 获取焦点
                    var Sel = document.selection.createRange(); // 创建选定区域
                    Sel.moveStart('character', -ctrl.value.length); // 移动开始点到最左边位置
                    CaretPos = Sel.text.length;                      // 获取当前选定区的文本内容长度
                }
                // Firefox support 
                else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
                    CaretPos = ctrl.selectionStart; // 获取选定区的开始点 
                }
                return CaretPos;
            },
            openRage() {

            }
        },
        mounted() {

        }
    }
</script>

<style>
    .test {
    }
    img.emoji {
        width: 16px;
        height: 16px;
    }
</style>