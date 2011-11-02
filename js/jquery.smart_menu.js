(function($){
	
	$.fn.smartmenu = function(options) {
		
		
		var	defaults = {
			ul_background:'white url(./background.png)',
			normal_color: 'gray',
			hover_color: 'darkgray',
			submenu_normal_backcolor: '#F4F4F4',
			submenu_hover_backcolor: '#D8D9D9',
			menu_border_color: 'gray',
			max_menu_check:false,
			max_menu:5,
			parent_menuitem_animation:false
		},
		settings = $.extend({}, defaults, options);
		  
		var mee=$(this);
		
		if(settings.max_menu_check && parseInt(settings.max_menu)!=0)
		{
			var numm=mee.children();
			var slength=numm.length;
			if(slength > settings.max_menu) 
			{	
				nmenu=settings.max_menu-1;
				newul=$('<ul class=\'more_ul\' id=\'more_ul\'></ul>');
				for(i=0;i<slength;i++)	
				{
					if(i > nmenu)
					{
						newul.append(numm.get(i));
					}
				}
				newli=$('<li class=\'more_li\' id=\'more_li\'><a class=\'more_a\' id=\'more_a\' href=\'#\'>More</a></li>').append(newul);
				mee.append(newli);
			}
		}
		mee.css('width',mee.children().length*118);
		mee.css({
		'border':'solid '+settings.menu_border_color+' 1px',
		//'border':'solid '+settings.menu_border_color+' 0px',
		'border-radius':'5px',
		'margin':'0px 0px 0px 0px',
		'padding':'0px 0px 0px 0px',
		'height':'26px',
		'background':settings.ul_background
		});
		
		$('> li',mee).css({
		//'border':'solid transparent 1px',
		'border':'solid ' + settings.menu_border_color +' 1px',
		'display':'inline',
		'list-style':'none',
		'width':'116px',
		'height':'19px',
		'position':'relative',
		'float':'left',
		'cursor':'pointer',
		'padding':'5px 0px 0px 0px',
		'text-align':'center',
		});
		//$('> li:not(:last)',mee).css({'border':'solid transparent 1px'});
		$('> li:first',mee).css({'border-left':'solid transparent 1px'});
		$('> li',mee).css({
			'border-top':'solid transparent 1px',
			'border-bottom':'solid transparent 1px',
			'border-right':'solid transparent 1px'
		});
		
		$('li a', mee).css({
		'text-decoration':'none',
		'text-shadow':'none',
		'width':'100%',
		'font-weight':'bold',
		'border':'solid black 0px',
		'font-size':'12px',
		'color':settings.normal_color
		});
		
		$('li ul',mee).css({
		'border':'solid '+settings.menu_border_color+' 1px',
		'border-bottom':'solid '+settings.menu_border_color+' 0px',
		'position':'relative',
		'display':'none',
		'margin':'4px 0px 0px 0px',
		'padding':'0px 0px 0px 0px',
		'width':'180px',
		'background-color':settings.submenu_normal_backcolor
		});
		
		$('li ul li', mee).css({
		'border-bottom':'solid '+settings.menu_border_color+' 1px',
		'display':'block',
		'width':'180px',
		'height':'14px',
		'padding':'5px 0 5px 0px',
		'text-align':'left',
		'margin':'0px 0px 0px 0px',
		'text-indent':'10px',
		'background':'none',
		'cursor':'pointer'
		});
		
		//OnHover Show SubLevel Menus
		$('> li', mee).hover(
			//OnHover
			function(){
				if(settings.parent_menuitem_animation !=false)
				{
					$('a:first', this).animate({'margin-left':'10px'},'fast');
					$('a:first', this).animate({'margin-left':'-8px'},'fast');
					$('a:first', this).animate({'margin-left':'0px'},'300', 'swing');
				}
				$('ul:first', this).css({'top':$(mee).top});
				$('a:first', this).css('color',settings.hover_color);
				$('ul:first', this).slideDown('fast');
				
			},
			//OnOut
			function(){
				$('a:first', this).css('color',settings.normal_color);
				$('ul:first', this).fadeOut('fast');
			}
			
		);
		
	$('li ul li', mee).hover(
	function(){
	$(this).css('background-color',settings.submenu_hover_backcolor);
	thisoffset=$(this).offset();
	scrwidth=screen.width;
	availaable_space=(scrwidth - thisoffset.left)-180;
	
	if(availaable_space >= 180)
	{
		$('ul:first', this).css({'top':-21,'left':$(this).width(),'margin':'0 0 0 0'});
		left=false;
	}
	else
	{
		$('ul:first', this).css({'top':-36,'left':-($(this).width()+2)});
		left=true;
	}
	
	$('ul:first', this).show();
	curul=$('ul:first', this);
	if(left==true)
	{
		
		$('li', curul).css('overflow','hidden');
		$('li a', curul).css({'margin-left':'180px'});
		$('li a', curul).animate({'margin-left':'0px'},'fast', function(){
		$('li', curul).css('overflow','');
		});
	}
	else
	{
		$('li', curul).css('overflow','hidden');
		$('li a', curul).css({'margin-left':'-180px'});
		$('li a', curul).animate({'margin-left':'0px'},'fast', function(){
		$('li', curul).css('overflow','');
		});
	}
	$('ul li ul', this).fadeOut('fast');
	},
	function(){
	$(this).css('background-color',settings.submenu_normal_backcolor);
	curul=$('ul:first', this);
	$('ul:first', this).hide();
	});
	
	// Clicking on li will link/a will be clicked	
	$('> li > ul > li', mee).click(
	function(){
	window.location = $('a', this).attr('href');
	});
		
	return mee;
}
})(jQuery);	