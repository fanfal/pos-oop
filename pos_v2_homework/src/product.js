function Product(){

}
Product.prototype.get_idCode_of_product  = function(str){
  return parseInt(str.substr(str.lastIndexOf('0',10)));
}
Product.prototype.get_broughted_number_of_product = function(store,input){
  for(i=0;i<input.length;i++)
   {

    if(input[i].length > 10)
     {

        store[this.get_idCode_of_product(input[i])].buy +=
        parseInt(input[i].substr(11));

     }
    else if (input[i].length == 10)
     {
         store[this.get_idCode_of_product(input[i])].buy += 1;
     }
     else
     {
         alert("the input of the barcode is wrong,please check carefully");
     }
   }

}
Product.prototype.get_the_discount_number_of_product = function(store,type,loadMessage){
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
      if(store[this.get_idCode_of_product(loadMessage[location].barcodes[i])].buy >2)
        {
          store[this.get_idCode_of_product(
            loadMessage[location].barcodes[i])].send = 1;
        }
    }

}
