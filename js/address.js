/**
 * Created by lhy on 17-11-26.
 */
new Vue({
    el:".container",
    data:{
        addressList:[],
        showMoreFlag:false,
        curIndex:0,
        sendIndex:undefined
    },
    //生命周期
    mounted:function(){
        this.$nextTick(function () {
            this.getAddressList();
        })
    },
    computed:{
        showDefault:function(){
            if(this.showMoreFlag){
                return this.addressList
            }else{
                return this.addressList.slice(0,3)
            }
        }
    },
    methods:{
        getAddressList:function(){
            this.$http.get('data/address.json',{"id":123}).then(response=>{
                if(response.data.status==0){
                    this.addressList=response.data.result;
                }
            });
        },
        showMore:function(){
            this.showMoreFlag=!this.showMoreFlag;
        },
        setDefault:function(){
            this.addressList.forEach((address,index)=>{
                if(index==this.curIndex){
                    address.isDefault=true;
                }else{
                    address.isDefault=false;
                }
            });
        }
    },
});