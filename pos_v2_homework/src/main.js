//this function is returning the idcode without front 0
function get_idCode_of_product(str){
return parseInt(str.substr(str.lastIndexOf('0',10)));
}
//this function get the broughted numver of one identified product
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
//this function judges weather the product is in the list of discount
// and caculate the number
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
function print_the_title_of_list()
{
/*  var time = new Date(),
  year = dateDigitToString(time.getFullYear()),
  month = dateDigitToString(time.getMonth()),
  date = dateDigitToString(time.getDate()),
  hour = dateDigitToString(time.getHours()),
  minute = dateDigitToString(time.getMinutes()),
  second = dateDigitToString(time.getSeconds()),
  string = year + '年' + month + '月' + date + '日' + hour + ‘：’ + minute + ‘：’ + second;*/
  return  '***<没钱赚商店>购物清单***\n';
}
function print_the_seperate_line(str)
{
  if(str == "-")
    {
      return "----------------------\n";
    }
  else if(str == "*")
    {
      return "**********************";
    }
  else
    {
      alert("please check the parameter of the function of print_the_title_of_list and make sure that is - or *");
    }
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

    var twoSendOne = loadPromotions();
    var allItems = loadAllItems();
    get_broughted_number_of_product(store,input);
    get_the_discount_number_of_product(store,'BUY_TWO_GET_ONE_FREE',twoSendOne);
    //the brought and discont information are all in the stroe array

    var string = print_the_title_of_list();
    var sendString = print_the_seperate_line("-")+'挥泪赠送商品：\n';
    var totalValue = 0;
    var saveValue = 0;
     for(i=0;i<store.length;i++)
      {
        for(j=0;j<allItems.length;j++)
          {
              if( store[i].buy != 0 && i == get_idCode_of_product(allItems[j].barcode)
          && store[i].send == 0)
              {
                     var total = store[i].buy*allItems[j].price;
                     totalValue += total;

                      string += '名称：'+allItems[j].name+
                      '，数量：'+store[i].buy+allItems[j].unit+
                      '，单价：'+allItems[j].price.toFixed(2)+'(元)'+
                      '，小计：'+total.toFixed(2)+'(元)\n';
               }
              else if(store[i].buy != 0 &&i == get_idCode_of_product(allItems[j].barcode)
          && store[i].send == 1)
             {
                    var total = (store[i].buy-store[i].send)*allItems[j].price;
                    totalValue += total;
                    saveValue += allItems[j].price;

                    string += '名称：'+allItems[j].name+
                    '，数量：'+store[i].buy+allItems[j].unit+
                    '，单价：'+allItems[j].price.toFixed(2)+'(元)'+
                    '，小计：'+total.toFixed(2)+'(元)\n';

                    sendString += '名称：'+allItems[j].name+
                        '，数量：'+store[i].send+allItems[j].unit+'\n';
             }
      }
   }
    var finalString = string+sendString+print_the_seperate_line("-")+
    '总计：'+totalValue.toFixed(2)+'(元)\n'+'节省：'+saveValue.toFixed(2)+'(元)\n'+
    print_the_seperate_line("*");
    console.log(finalString);

 }
