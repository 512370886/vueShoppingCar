/**
 * Created by lhy on 17-11-22.
 */
var vm=new Vue({
    el:"#app",
    data:{
        totalMoney:0,
        productList:[],
        checkAll:false,
        delOut:false,
        productId:undefined,
        delIndex:undefined
    },
    mounted:function(){
        this.$nextTick(function () {
            this.cartView();
        })
    },
    methods:{
        cartView:function(){
            this.$http.get('data/cartData.json',{"id":123}).then(res=>{
                if(res.data.status==1){
                    this.productList=res.data.result.list;
                    // this.totalMoney=res.data.result.totalMoney;
                }
            });
        },
        calculate:function(){
            this.totalMoney=0;
            this.productList.forEach((item,index)=>{
                if(item.checked==true){
                    this.totalMoney+=item.productPrice*item.productQuantity;
                }
            });
        },
        changeMoney:function(item,flag){
            if (flag==-1&&item.productQuantity>1){
                item.productQuantity--;
            }else if(flag==1){
                item.productQuantity++;
            }
            this.calculate();
            // return item.productQuantity
        },
        eachProductMoney:function(item){
            return item.productPrice*item.productQuantity;
        },
        selectedProduct:function(item){
            if(typeof item.checked=='undefined'){
                // Vue.set(item,'checked',true);
                //局部注册
                this.$set(item,'checked',true);
            }else{
                item.checked=!item.checked;
            }
            this.calculate();
        },
        selectedAll:function(){
            this.checkAll=!this.checkAll;
            this.productList.forEach((item,index)=>{
                if(typeof item.checked=='undefined'){
                    // Vue.set(item,'checked',true);
                    //局部注册
                    this.$set(item,'checked',this.checkAll);
                }else{
                    item.checked=this.checkAll;
                }
            });
            this.calculate();
        },
        del:function(item){
            this.delOut=true;
            this.productId=item.productId;
        },
        cancelDel:function(){
            this.delOut=false;
        },
        confirmDel:function(){
            this.delOut=false;
            this.productList.forEach((item,index)=>{
                if(item.productId==this.productId){
                    this.delIndex=index;
                    item.checked=false;
                }
            });
            this.productList.splice(this.delIndex,1);
            this.calculate();
        }
    }
});
Vue.filter('formatMoney',function(value){
    return value.toFixed(2);
});