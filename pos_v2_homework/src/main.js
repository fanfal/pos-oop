function print_the_title_of_list()
{
  var time = new Time();

  return  '***<没钱赚商店>购物清单***\n' + time.string + '\n' + print_the_seperate_line("-");
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
function create_information_array(allItems)
{
  var store = new Array(allItems.length);
  for(var i=0;i<allItems.length;i++)
    {
      store[i] = new Array(2);
      store[i].buy = 0;
      store[i].send = 0;
    }
      return store;
}

function printInventory(input)
{
    var allItems = loadAllItems();
    var store = create_information_array(allItems);
    var product = new Product();
    var twoSendOne = loadPromotions();
    product.get_broughted_number_of_product(store,input);
    product.get_the_discount_number_of_product(store,'BUY_TWO_GET_ONE_FREE',twoSendOne);
    //the brought and discont information are all in the stroe array

    var string = print_the_title_of_list();
    var sendString = print_the_seperate_line("-")+'挥泪赠送商品：\n';
    var totalValue = 0;
    var saveValue = 0;

    for(i=0;i<store.length;i++)
     {
       for(j=0;j<allItems.length;j++)
         {
            if( store[i].buy != 0 && i == product.get_idCode_of_product(allItems[j].barcode)
        && store[i].send == 0)
            {
                   var total = store[i].buy*allItems[j].price;
                   totalValue += total;

                    string += '名称：'+allItems[j].name+
                    '，数量：'+store[i].buy+allItems[j].unit+
                    '，单价：'+allItems[j].price.toFixed(2)+'(元)'+
                    '，小计：'+total.toFixed(2)+'(元)\n';
                    break;
             }
            else if(store[i].buy != 0 && i == product.get_idCode_of_product(allItems[j].barcode)
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
                   break;
            }
         }
      }
    var finalString = string+sendString+print_the_seperate_line("-")+
    '总计：'+totalValue.toFixed(2)+'(元)\n'+'节省：'+saveValue.toFixed(2)+'(元)\n'+
    print_the_seperate_line("*");

    console.log(finalString);

 }
