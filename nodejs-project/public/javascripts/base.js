/*
 ***************************
 *  tizi common javascript  *
 *  dependent jquery-1.6.4 *
 *  version:1.0            *
 *  coder:jack_lcz        *
 *  date:2014/03/08        *
 ***************************
 */

if(!window.Tizi)
    {
       window.Tizi={}
    }
window._ = window.Tizi;


/* @example _.login('name', 'pwd');
 * @desc login logic
 */

Tizi.login = function(uname,pwd){
    alert('you name is "' + uname);
    return;
}
