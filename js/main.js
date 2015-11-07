
var UsersCollection = Backbone.Collection.extend({
    url: 'https://twitter-pi.herokuapp.com/users'
});



var homepageView = Backbone.View.extend({
  template: _.template($("#homepage").html()),

  render: function(){
    this.$el.html(this.template());
    return this;
  }
});

var loginView = Backbone.View.extend({
  template: _.template($("#login").html()),

  render: function(){
    this.$el.html(this.template());
    return this;
  }
});

var registerView = Backbone.View.extend({
  template: _.template($("#register").html()),

  render: function(){
    this.$el.html(this.template());
    return this;
  }
});

var homeView = Backbone.View.extend({
  template: _.template($("#home").html()),

  render: function(){
    this.$el.html(this.template());
    return this;
  }
});

var UsersView = Backbone.View.extend({
  template: _.template($("#users").html()),

  initialize: function(options){
    // this.listenTo(this.collection, 'fetch', this.render);
    this.pageId = options.pageId;
  },

  render: function(){
    this.$el.html(this.template({
      page: this.pageId + 1,
      users: this.collection.toJSON()
    }));
    return this;
  }
});

var userProfileView = Backbone.View.extend({
  template: _.template($("#userProfile").html()),

  render: function(){
    this.$el.html(this.template());
    return this;
  }
});

var Router = Backbone.Router.extend({

  routes: {
    "": "homepage",
    "login": "login",
    "register": "register",
    "home": "dashboard",
    "users": "users",
    "users/:pageId": "users",
    "users/profile/:userId": "userProfile"
  },

  homepage: function(){
    var homepage = new homepageView();
    $("main").html(homepage.render().$el);
  },

  login: function(){
    var login = new loginView();
    $("main").html(login.render().$el);
  },

  register: function(){
    var register = new registerView();
    $("main").html(register.render().$el);
  },

  dashboard: function(){
    var home = new homeView();
    $("main").html(home.render().$el);
  },

  users: function(pageId){

    var collection = new UsersCollection();
    var users = new UsersView({
      pageId: Number(pageId),
      collection: collection
    });

    collection.fetch({
      success: function(){
        $("main").html(users.render().$el);
      }
    });
  },

  userProfile: function(){
    var userId = this.id;
    var userProfile = new userProfileView();
    $("main").html(userProfile.render().$el);
  }
});

var router = new Router();

Backbone.history.start();
