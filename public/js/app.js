;(function() {

  // Our main application
  var app = {};










  /* -------------------------------------------------- //
  //  PanelView
  // -------------------------------------------------- */
  var PanelView = Backbone.View.extend({
    // Settings for in/out renders. For the purposes of this application, 
    // the durations are best left set only once here so that each panel
    // can transition at constant speeds. Our ease is also exposed to us
    // via jQuery.transit (@url), if not using this plugin, be sure to use
    // standard CSS easing: ('linear', 'ease-in', 'ease-in-out', 'ease-out')
    transitions: {
      duration: 220,
      ease: 'easeOutSine'
    },

    // Set index to === the parameter passed in on contstruct. This is a 
    // specific property used to manage the direction of transitions.
    initialize: function() {
      this.index = this.options.index;
    },

    // Called by the application Router when this view needs to slide out
    // We et our views know when we have finished by calling .afterRender()
    render: function(reverse) {

      // Scope this to _this so that we can reference our view properly
      // in the context of our transition callback
      var _this = this,
          reset = reverse ? '-100%' : '100%';

      // If reverse is passed in as true, we will be rendering in from left
      // to right. So we set our view's transform to -100% (outside the left of the viewport)
      // if(reverse){ this.$el.css({x:'-100%'}); }

      this.$el.css({x: reset});

      // Animate in this.$el (the panel). On complete, we call the afterRender()
      // in case our view's need to do more work.
      this.$el.transition({
        x:'0%',
      }, _this.transitions.duration, _this.transitions.ease, function() {
        _this.afterRender();
      });
    },


    // Called by the application Router when this view needs to slide out
    renderOut: function(reverse) {

      // Scope this to _this so that we can reference our view properly
      // in the context of our transition callback
      var _this = this,

          // Decide which direction we will slide out based on the passed
          // value of reverse
          to = reverse ? '100%' : '-100%';


      // Animate out this panel then call reset() on the view
      this.$el.transition({
        x: to,
      }, _this.transitions.duration, _this.transitions.ease, function() {
        _this.reset();
      });

    },

    // Empty methods to avoid errors when calling these methods on views
    // that may not need them specifically
    afterRender: function() { /* ... */ },
    reset: function() { /* ... */ }

  });










  /* -------------------------------------------------- //
  //  View Classes
  // -------------------------------------------------- */

  // Landing View
  var LandingView = PanelView.extend({
    afterRender: function() {
      this.$el.addClass('landing_render');
    },
    reset: function() {
      this.$el.removeClass('landing_render');
    } 
  });

  // Work View
  var WorkView = PanelView.extend({
    afterRender: function() {
      this.$el.addClass('work_render');
    },
    reset: function() {
      this.$el.removeClass('work_render');
    } 
  });

  // Contact View
  var ContactView = PanelView.extend({
    afterRender: function() {
      this.$el.addClass('contact_render');
    },
    reset: function() {
      this.$el.removeClass('contact_render');
    } 
  });











  /* -------------------------------------------------- //
  //  Router
  // -------------------------------------------------- */
  var Router = Backbone.Router.extend({

    routes: {
      '': 'landing',
      'work': 'work',
      'contact': 'contact'
    },

    landing: function() {
      this.transition( app.landingView );
    },

    work: function() {
      this.transition( app.workView );
    },

    contact: function() {
      this.transition( app.contactView );
    },

    transition: function( newView ) {

      var reverse = false;

      if(this.currentView)
        this.oldView = this.currentView

      this.currentView = newView;

      if(this.oldView) {
        reverse = (this.currentView.index < this.oldView.index) || this.currentView.index === 0;
        this.oldView.renderOut(reverse);  
      }

      this.currentView.render(reverse);
    }

  });


  // Nav View
  var NavView = Backbone.View.extend({
    events: {
      'click a': 'nav'
    },
    nav: function(evt) {
      Backbone.history.navigate($(evt.currentTarget).attr('href'), {trigger:true});
      evt.preventDefault();
    }
  })









  /* -------------------------------------------------- //
  //  Bootstrap The Application
  // -------------------------------------------------- */
  app.landingView = new LandingView({el: '#landing', index: 0});
  app.workView = new WorkView({el: '#work', index: 1});
  app.contactView = new LandingView({el: '#contact', index: 2});

  app.navView = new NavView({el:'nav'});

  app.router = new Router();

  Backbone.history.start({pushState: true});

})();