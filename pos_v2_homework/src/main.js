//this function is returning the idcode without front 0
function get_idCode_of_product(str){
return parseInt(str.substr(str.lastIndexOf('0',10)));
}

function get_broughted_number_of_product(store,input)
{
 for(i=0;i<input.length;i++)
  {

   if(input[i].length > 10)
    {

       store[get_idCode_of_product(input[i])].buy +=
       parseInt(input[i].substr(11));

    }
   else if (input[i].length == 10)
    {
        store[get_idCode_of_product(input[i])].buy += 1;
    }
    else
    {
        alert("the input of the barcode is wrong,please check carefully");
    }
  }
  return store;
}
//this function get the broughted numver of one identified product
function get_the_discount_number_of_product(store,type,loadMessage)
{
  var location;
  for (var i=0;i<loadMessage.length;i++)
    {
      if(type === loadMessage[i].type)
        {
          location = i;
          break;
        }
    }

  for(var i=0;i<loadMessage[location].barcodes.length;i++)
   {
      if(store[get_idCode_of_product(loadMessage[location].barcodes[i])].buy >2)
        {
          store[get_idCode_of_product(
            loadMessage[location].barcodes[i])].send = 1;
        }
    }
    return store;
}
function printInventory(input)
{
  var store = [
    {
      buy:0,
      send:0
    },
    {
      buy:0,
      send:0
    },
    {
      buy:0,
      send:0
    },
    {
      buy:0,
      send:0
    },
    {
      buy:0,
      send:0
    },
    {
      buy:0,
      send:0
    }
  ];


    get_broughted_number_of_product(store,input);
    var twoSendOne = loadPromotions();
    var allItems = loadAllItems();
    get_the_discount_number_of_product(store,'BUY_TWO_GET_ONE_FREE',twoSendOne);


    var string = '***<没钱赚商店>购物清单***\n';
    var sendString = '----------------------\n'+'挥泪赠送商品：\n';
    var totalValue = 0;
    var saveValue = 0;
     for(i=0;i<store.length;i++)
      {
        for(j=0;j<allItems.length;j++)
          {
            if(store[i].buy != 0)
            {

                if( i == parseInt(allItems[j].barcode.substr(allItems[j].barcode.lastIndexOf('0')+1,10))
            && store[i].send == 0)
                {
                       var total = store[i].buy*allItems[j].price;
                          string += '名称：'+allItems[j].name+
                          '，数量：'+store[i].buy+allItems[j].unit+
                          '，单价：'+allItems[j].price.toFixed(2)+'(元)'+
                          '，小计：'+total.toFixed(2)+'(元)\n';
                        totalValue += total;

                 }
                else if(i == parseInt(allItems[j].barcode.substr(allItems[j].barcode.lastIndexOf('0')+1,10))
            && store[i].send == 1)
               {
                      var total = (store[i].buy-store[i].send)*allItems[j].price;
                          string = string + '名称：'+allItems[j].name+
                          '，数量：'+store[i].buy+allItems[j].unit+
                          '，单价：'+allItems[j].price.toFixed(2)+'(元)'+
                          '，小计：'+total.toFixed(2)+'(元)\n';
                       sendString += '名称：'+allItems[j].name+
                              '，数量：'+store[i].send+allItems[j].unit+'\n';
                        totalValue += total;
                        saveValue += allItems[j].price;

               }
            }
      }
   }
    var temptString = string+sendString+'----------------------\n'+'总计：'+totalValue.toFixed(2)+'(元)\n'+'节省：'+saveValue.toFixed(2)+'(元)\n'+'**********************';
    console.log(temptString);

 }
