//LOAD PAGE
$(document).ready(function() {
  var tab_template = $('#tab-template').html();
  var content_template = $('#'+ptype+'-template').html();
  /* TODO switch to content_template for final version */
  var player_template = $('#player-template').html();
  var reaper_template = $('#reaper-template').html();
  var overview_template = $('#overview-template').html();
  var cp_template = $('#cp-template').html();
  for (i = 0; i < numEntities; i++) {
    $('body').append(cp_template.replace(/##/g, i.toString()));
    $('ul').append(tab_template.replace(/##/g, i.toString()));
    /* TODO switch to content_template for final version
    $('.container').append(content_template.replace(/##/g, i.toString()));
    */
    if(i == 0){
      $('.container').append(player_template.replace(/##/g, i.toString()));
    }
    else{
      $('.container').append(reaper_template.replace(/##/g, i.toString()));
    }
    $('#ov').append(overview_template.replace(/##/g, i.toString()));
  }
  setInterval(refresh("Updated!"), 300000);
/*
  $('.overview').css('display', 'block');
  $('#overview').addClass('active');
  */
  $('#id0-content').css('display', 'block'); //TODO switch to overview before pushing final
  $('#id0').addClass('active');
  // Alternatively, add cookies to keep track of which tab person was on


});

//TAB SELECTION
$(function() {
  $('.tabs').on('click', 'li', function() {
    $(this).addClass('active').siblings().removeClass('active');
    var tablinks = document.getElementsByClassName("tab");
    var tabcontent = document.getElementsByClassName("content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tabcontent[$(this).index()].style.display = "block";
  });
});


// Fill in the damn information.
function fill(id) {
  var sheet = id + 6;
  $.getJSON("https://spreadsheets.google.com/feeds/list/"+key+"/" + sheet + "/public/values?alt=json", function(data) {
    /* collect data that shows up multiple times */
    var color = data.feed.entry[7]['gsx$type']['$t'];
    var name = data.feed.entry[0]['gsx$data']['$t'];
    var cp = data.feed.entry[3]['gsx$cp']['$t'];
    var totalhp = trim(data.feed.entry[1]['gsx$hp']['$t'], 3);
    var currhp = trim(data.feed.entry[0]['gsx$hp']['$t'], 3);
    var atk = trim(data.feed.entry[1]['gsx$atk']['$t'], 4);
    var def = trim(data.feed.entry[1]['gsx$def']['$t'], 4);
    var img = data.feed.entry[4]['gsx$data']['$t'];
    // Apply accent colors
    if(color.toLowerCase()=="dead"){
      color = "gray";
      $("#overview"+id).addClass("accent"+id);
    }
    var els = document.getElementsByClassName('accent' + id);
    var bg_els = document.getElementsByClassName('accent'+id+"-bg");
    for (i = 0; i < els.length; i++) {
      els[i].style.color = color;
    }

    //Determine whether to use white or black text
    //Luma value is only an estimate; will require testing
    var rgb = color_convert.to_rgba_array(color);
    var luma = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    var text_color = "black";
    if(luma <= 125){
      text_color = "white";
    }
    // Fill in background colors and apply appropriate text color
    for (i = 0; i < bg_els.length; i++) {
      bg_els[i].style.background = color;
      bg_els[i].style.color = text_color;
    }
    //Fill in text fields
    /* Tab */
    document.getElementById('id' + id + '-tab').innerHTML = name;
    /* Overview */
    document.getElementById('ov'+id+'-name').innerHTML = name;
    $('#ov'+id+'-cp').val(cp);
    document.getElementById('ov'+id+'-hp').innerHTML = currhp + "/" + totalhp;
    document.getElementById('ov'+id+'-atk').innerHTML = atk;
    document.getElementById('ov'+id+'-def').innerHTML = def;

    /* Top card */
    if(img != ""){
      document.getElementById('id'+id+'-image').src = img;
      document.getElementById('id'+id+'-imagecpy').src = img;
    }
    else{
      document.getElementById('id'+id+'-image').src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/200px-Placeholder_no_text.svg.png";
    }
    document.getElementById('id' + id + '-name').innerHTML = name;
    document.getElementById('id'+id+'-fullname').innerHTML = data.feed.entry[1]['gsx$data']['$t'];
    document.getElementById('id'+id+'-pronouns').innerHTML = data.feed.entry[2]['gsx$data']['$t'];
    document.getElementById('id'+id+'-age').innerHTML = data.feed.entry[3]['gsx$data']['$t'];
    document.getElementById('id'+id+'-part').innerHTML = data.feed.entry[9]['gsx$data']['$t'];
    /* Stats */
    document.getElementById('id'+id+'-currhp').innerHTML = currhp;
    document.getElementById('id'+id+'-totalhp').innerHTML = totalhp;
    document.getElementById('id'+id+'-basehp').innerHTML = trim(data.feed.entry[2]['gsx$hp']['$t'], 3);
    document.getElementById('id'+id+'-thrdhp').innerHTML = trim(data.feed.entry[3]['gsx$hp']['$t'], 3);
    document.getElementById('id'+id+'-mischp').innerHTML = trim(data.feed.entry[4]['gsx$hp']['$t'], 3);
    document.getElementById('id'+id+'-totalatk').innerHTML = atk;
    document.getElementById('id'+id+'-baseatk').innerHTML = trim(data.feed.entry[2]['gsx$atk']['$t'], 4);
    document.getElementById('id'+id+'-thrdatk').innerHTML = trim(data.feed.entry[3]['gsx$atk']['$t'], 4);
    document.getElementById('id'+id+'-miscatk').innerHTML = trim(data.feed.entry[4]['gsx$atk']['$t'], 4);
    document.getElementById('id'+id+'-totaldef').innerHTML = def;
    document.getElementById('id'+id+'-basedef').innerHTML = trim(data.feed.entry[2]['gsx$def']['$t'], 4);
    document.getElementById('id'+id+'-thrddef').innerHTML = trim(data.feed.entry[3]['gsx$def']['$t'], 4);
    document.getElementById('id'+id+'-miscdef').innerHTML = trim(data.feed.entry[4]['gsx$def']['$t'], 4);
    /* Currency */
    document.getElementById('id'+id+'-yen').innerHTML = data.feed.entry[7]['gsx$hp']['$t'];
    document.getElementById('id'+id+'-rpp').innerHTML = data.feed.entry[8]['gsx$hp']['$t'];
    document.getElementById('id'+id+'-brv').innerHTML = data.feed.entry[7]['gsx$def']['$t'];
    document.getElementById('id'+id+'-syncbp').innerHTML = data.feed.entry[8]['gsx$def']['$t'];
    /* About */
    document.getElementById('id'+id+'-personality').innerHTML = data.feed.entry[5]['gsx$data']['$t'];
    document.getElementById('id'+id+'-fee').innerHTML = data.feed.entry[6]['gsx$data']['$t'];
    document.getElementById('id'+id+'-reason').innerHTML = data.feed.entry[7]['gsx$data']['$t'];
    document.getElementById('id'+id+'-appearance').innerHTML = data.feed.entry[8]['gsx$data']['$t'];
    /* Tooltips
    document.getElementById('id'+id+'-mun').innerHTML = data.feed.entry[10]['gsx$data']['$t'];
    document.getElementById('id'+id+'-timezone').innerHTML = data.feed.entry[11]['gsx$data']['$t'];
    document.getElementById('id'+id+'-skype').innerHTML = data.feed.entry[12]['gsx$data']['$t'];
    document.getElementById('id'+id+'-blog').innerHTML = data.feed.entry[13]['gsx$data']['$t'];
    */
    /* Food */
    $("#id"+id+"-food tr").remove();
    var food_template = $("#food-template").html();
    for(i = 0; i < 13; i++){
      var food = data.feed.entry[15+i]['gsx$data']['$t'];
      var quantity = data.feed.entry[15+i]['gsx$n']['$t'];
      if(food != "" && quantity != "")
      {
        var healio = data.feed.entry[7+i]['gsx$heal']['$t'];
        healio = healio.replace("HP", "<span class='rink'>HP</span>");
        var entry = food_template.replace("FOOD", food);
        entry = entry.replace("BOOSTS", prep(data.feed.entry[15+i]['gsx$b']['$t']));
        entry = entry.replace("QUANTITY", quantity);
        entry = entry.replace("HEAL", healio);
        $('#id'+id+'-food').append(entry);
      }
    }
    /* Pins and Threads and Swag */
    // Clear out the current tables
    $("#id"+id+"-tinventory tr").remove();
    $("#id"+id+"-pinventory tr").remove();
    $("#id"+id+"-threquip tr").remove();
    $("#id"+id+"-pinquip tr").remove();
    $("#id"+id+"-swag tr").remove();
    var swag_template = $("#swag-template").html();
    var pin_template = $("#pin-template").html();
    var thread_template = $("#thread-template").html();
    var equipped_threads = new Array(4);
    var equipped_pins = new Array(6);
    for(i = 0; i < 9; i++){
      //Pins
      var pid = data.feed.entry[11+i]['gsx$id']['$t'];
      if(pid != ""){
        var equipslot = data.feed.entry[11+i]['gsx$e']['$t'];
        var entry = pin_template.replace("ID", pid);
        entry = entry.replace("PIN", data.feed.entry[11+i]['gsx$name']['$t']);
        entry = entry.replace("ATK", data.feed.entry[11+i]['gsx$atk']['$t']);
        entry = entry.replace("EFFECT", data.feed.entry[11+i]['gsx$effect']['$t']);
        if(equipslot == ""){ //not equipped; put it in the inventory
          $('#id'+id+'-pinventory').append(entry);
        }
        else{ // equip it
          equipped_pins[parseInt(equipslot)] = entry;
        }
      }
      //Threads and Swag
      if(i < 7){
        //Threads
        var eid = data.feed.entry[21+i]['gsx$id']['$t'];
        if(eid != ""){
          var equipslot = data.feed.entry[21+i]['gsx$e']['$t'];
          var entry = thread_template.replace("ID", eid);
          entry = entry.replace("THREAD", data.feed.entry[21+i]['gsx$name']['$t']);
          entry = entry.replace("TYPE", thread_type(data.feed.entry[21+i]['gsx$type']['$t']));
          entry = entry.replace("EFFECT", data.feed.entry[21+i]['gsx$effect']['$t']);
          var ehp = data.feed.entry[21+i]['gsx$hp']['$t'];
          var eatk = data.feed.entry[21+i]['gsx$atk']['$t'];
          var edef = data.feed.entry[21+i]['gsx$def']['$t'];
          entry = entry.replace("STATS", stat(ehp, eatk, edef));
          entry = entry.replace("BRV", data.feed.entry[21+i]['gsx$cp']['$t'] + " BRV");
          if(data.feed.entry[21+i]['gsx$equip']['$t'] == "no"){
            entry = entry.replace(" BRV", "* BRV");
          }
          if(equipslot == ""){ //not equipped; put it in the inventory
            $('#id'+id+'-tinventory').append(entry);
          }
          else{ //equip it
            equipped_threads[parseInt(equipslot)] = entry;
          }
        }
        var sweg = data.feed.entry[29+i]['gsx$b']['$t'];
        if(sweg != ""){
          var entry = swag_template.replace("SWAG", sweg);
          entry = entry.replace("DESC", data.feed.entry[29+i]['gsx$data']['$t']);
          $("#id"+id+"-swag").append(entry);
        }
      }
    }

    /* Equip */
    for(i = 0; i < equipped_pins.length; i++){
      $('#id'+id+'-pinquip').append(equipped_pins[i]);
    }
    for(i = 0; i < equipped_threads.length; i++){
      $('#id'+id+'-threquip').append(equipped_threads[i]);
    }



/* Noise Form */
if(ptype == "reaper"){
  document.getElementById('id'+id+'noiseimg').src = "http://i.imgur.com/fMgAHKF.png";
  // TODO finish
}
});
}
//TRIM (remove last few characters)
function trim(str, num){
  return str.substring(str, str.length - num);
}
//BOOST PREP
function prep(str){
  var tokens = str.split(",");
  if(tokens.length == 1){
    return str;
  }
  var ans = "";
  for(i = 0; i < tokens.length - 2; i++){
    ans += "<span class='nobreak'>" + tokens[i] +",</span> ";
  }
  return ans + "<span class='nobreak'>" + tokens[i] +"</span> ";;
}
// STAT COMPILATION
function stat(hp, atk, def){
  var ans = "";
  if(hp.charAt(0) == '-'){
    ans += "<span class='nobreak'>" + hp + ",</span> ";
  }
  else if(hp.length > 0){
    ans += "<span class='nobreak'>" + "+" + hp + ",</span> ";
  }
  if(atk.charAt(0) == '-'){
    ans += "<span class='nobreak'>" + atk + ",</span> ";
  }
  else if(atk.length > 0){
    ans += "<span class='nobreak'>" + "+" + atk + ",</span> ";
  }
  if(def.charAt(0) == '-'){
    ans += "<span class='nobreak'>" + def + ",</span> ";
  }
  else if(def.length > 0){
    ans += "<span class='nobreak'>" + "+" + def + ",</span> ";
  }
  if(ans.length > 0){
    return ans.substring(0, ans.length-9) + "</span>";
  }
  return ans;
}
// Return a less lengthy version of the string
// TODO replace with icons
function thread_type(str){
  if(str.charAt(0) == "T"){
    if(str.length > 3){
      return "T&B";
    }
    else{
      return "Top";
    }
  }
  if(str.charAt(0) == "H"){
    return "Head";
  }
  if(str.charAt(0) == "A"){
    return "Acc";
  }
  if(str.charAt(0) == "F"){
    return "Foot";
  }
}
//COLOR RESOLUTION -- nicked from here:
// https://gist.github.com/njvack/02ad8efcb0d552b0230d
color_convert = function() {
  var pub = {}, canvas, context;
  canvas = document.createElement('canvas');
  canvas.height = 1;
  canvas.width = 1;
  context = canvas.getContext('2d');

  pub.to_rgba_array = function(color) {
    /**
     * Turns any valid canvas fillStyle into a 4-element Uint8ClampedArray with bytes
     * for R, G, B, and A. Invalid styles will return [0, 0, 0, 0]. Examples:
     * color_convert.to_rgb_array('red')  # [255, 0, 0, 255]
     * color_convert.to_rgb_array('#ff0000')  # [255, 0, 0, 255]
     * color_convert.to_rgb_array('garbagey')  # [0, 0, 0, 0]
     */
    // Setting an invalid fillStyle leaves this unchanged
    context.fillStyle = 'rgba(0, 0, 0, 0)';
    // We're reusing the canvas, so fill it with something predictable
    context.clearRect(0, 0, 1, 1);
    context.fillStyle = color;
    context.fillRect(0, 0, 1, 1);
    return context.getImageData(0, 0, 1, 1).data;
  }
  return pub;
}();


// TOGGLE
$(function () {
  $('.toggle-heading').on('click', function() {
    $(this).next('.toggle-content').slideToggle(200);
  });
});


//REFRESH
$(".refresh").click(function(){
  refresh("Updated!");
});
function refresh(message) // TODO refresh button
{
  for (i = 0; i < numEntities; i++) {
    fill(i);
  }
  toast(message, 1000);
}


//BUTTON LISTENER
var clipboard = new Clipboard('.btn');

function toast(text, time) {
  $('.toast').text(text).fadeIn(200).delay(time).fadeOut(200);
}

clipboard.on('success', function(e) {
  toast("Copied to clipboard!", 1000);
  e.clearSelection();
});

clipboard.on('error', function(e) {
  toast("Click the button again and CTRL+C immediately aftereward to copy your stats!", 4000);
});
//Prevent backspace from taking page back if stuff in input is highlighted
$('textarea[readonly]').keydown(function(event) {
  if (event.which === 8) {
    event.preventDefault();
  }
});
