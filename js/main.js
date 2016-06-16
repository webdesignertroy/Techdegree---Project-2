/************************
Variables
*************************/

var $navBar = $("#main-nav");
var $menuReveal = $("#menu-reveal");
var $menuLi = $("#main-nav li");
var $subMenuLi = $("#sub-menu li");
var $backTop = $("#back-top");
var mq = window.matchMedia('all and (max-width: 769px)');
var menuLength = 0;

/************************
Function Expressions
*************************/

// Function: hide menu items
var hideMenu = function() {
	$navBar.slideUp(400, "swing");
};

// Function: show menu items
var showMenu = function() {
	$navBar.slideDown(600, "swing");
};

// Function: scrolls to 'targeted id' on page
var $scroll = function($hash, menuCount) {
	$('html, body').animate({
		scrollTop: $( $hash ).offset().top - 50 * menuCount
	}, 500, "swing");
};

/************************
Event Listeners
*************************/

// On menu click, reveal or hide mobile navigation
$menuReveal.on("click", function(){

	// toggles MenuReveal button
	if( $navBar.css("display") === "none" ) {
		showMenu();
	} else {
		hideMenu();
	}
});

// On Main Menu <li> click, hide menu and scroll to 'targeted id'
$menuLi.on("click", function(e){
	// prevent normal action
	e.preventDefault();

	// defines the href of the 'targeted id' I'm looking for
	var $link = $(this).find("a").attr('href');

	// counts menu items to determine menu height
	mq.addListener(function(changed) {
		if(changed.matches) {
			menuLength = $menuLi.length;
		} else {
			$menuReveal.hide();
			menuLength = 0;
		}
	});

	// invokes hideMenu()
	if (mq.matches) {
		hideMenu();
	}

	// invokes $scroll()
	$scroll($link, menuLength);

});

// On Back-to-top link click, scroll to 'top id' 
$backTop.on("click", function(e){
	// prevent normal action
	e.preventDefault();

	// defines the href of the 'targeted id' I'm looking for
	var $link = $navBar.first().find("a").attr('href');

	// counts menu items to determine menu height
	mq.addListener(function(changed) {
		if(changed.matches) {
			menuLength = $menuLi.length;
		} else {
			$menuReveal.hide();
			menuLength = 0;
		}
	});

	// invokes $scroll()
	$scroll($link, menuLength);

});
// On Sub Menu <li> click, scroll to 'targeted id'
$subMenuLi.on("click", function(e){
	// prevent normal action
	e.preventDefault();

	// defines the href of the 'top id'
	var $link = $(this).find("a").attr('href');

	// counts menu items to determine menu height
	mq.addListener(function(changed) {
		if(changed.matches) {
			menuLength = $menuLi.length;
		} else {
			$menuReveal.hide();
			menuLength = 0;
		}
	});
	// invokes $scroll()
	$scroll($link, menuLength);

});
/************************
Media Queries
*************************/
// if javascript works, hide/show appropriate menues

if (mq.matches) {
	$menuReveal.show();
	$navBar.hide();
	menuLength = $menuLi.length;
} else {
	$menuReveal.hide();
	menuLength = 0;
}

// if javascript is on and the media window changes, 
//    hide/show appropriate menues
mq.addListener(function(changed) {
	if(changed.matches) {
		$menuReveal.show();
		$navBar.hide();
		menuLength = $menuLi.length;
	} else {
		$menuReveal.hide();
		$navBar.show();
		menuLength = 0;
	}
});


