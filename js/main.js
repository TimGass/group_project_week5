var tweets = 'https://twitter-pi.herokuapp.com/tweets';
var logedIn = false;
var loginStatus;
var statusPath;
var profilePage;
var userObject;


var UsersCollection = Backbone.Collection.extend({
    url: 'https://twitter-pi.herokuapp.com/users?include=tweets'
});



var HeaderView = Backbone.View.extend({
  template: _.template($("#header").html()),

  className: "header",

  render: function(){
    if(logedIn === false)
      loginStatus = "Login";
    else
    //This is where the logged in User Profile page link will be defined;
      loginStatus = profilePage;
    this.$el.html(this.template());
    return this;
  }
});


var HomepageView = Backbone.View.extend({
  template: _.template($("#homepage").html()),

  render: function(){
    this.$el.html(this.template());
    return this;
  }
});

var LoginView = Backbone.View.extend({
  template: _.template($("#login").html()),

  events: {
    "click .loginSubmit" : "handleLoginSubmit",
    "keypress .password" : "handleEnter"
  },

  handleLogin: function(){
    var $this = this;
    this.username = this.$(".username").val();

    userObject = this.collection.toJSON()[0].data.filter(function(user){
        return (user.attributes.email === $this.username);
    });

    if(userObject.length === 0){
      alert("D'oh!");
    }
    else{

    }

  },

  handleLoginSubmit: function(){
    this.handleLogin();
  },

  handleEnter: function(event){
    if(event.keyCode === 13)
      this.handleLogin();
    else
      return;
  },

  render: function(){
    var users = this.collection.toJSON();
    this.$el.html(this.template());
    return this;
  }
});

var RegisterView = Backbone.View.extend({
  template: _.template($("#register").html()),

  render: function(){
    this.$el.html(this.template());
    return this;
  }
});

var HomeView = Backbone.View.extend({
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
    console.log(options);
  },

  render: function(){
    this.$el.html(this.template({
      page: this.pageId + 1,
      users: this.collection.toJSON()
    }));
    console.log(this.collection.toJSON());
    return this;
  }
});

var UserProfileView = Backbone.View.extend({
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
    $("main").html("");

    var collection = new UsersCollection();

    var header = new HeaderView({collection: collection});
    var homepage = new HomepageView();
    collection.fetch({
      success: function(){
        $("main").append(header.render().$el);
        $("main").append(homepage.render().$el);
      },
      error: function(){
        $("main").append("Doh!");
      }
    });
  },

  login: function(){
    $("main").html("");

    var collection = new UsersCollection();

    var header = new HeaderView({collection: collection});
    var login = new LoginView({collection: collection});
    collection.fetch({
      success: function(){
        $("main").append(header.render().$el);
        $("main").append(login.render().$el);
      },
      error: function(){
        $("main").append("Doh!");
      }
    });

    // collection.create({"user":{
    //   "email": "yolo@swag.com",
    //   "password": "doh",
    //   "avatar": null
    // }});
  },

  register: function(){
    $("main").html("");

    var header = new HeaderView();
    $("main").append(header.render().$el);

    var register = new RegisterView();
    $("main").append(register.render().$el);
  },

  dashboard: function(){
    $("main").html("");

    var header = new HeaderView();
    $("main").append(header.render().$el);

    var home = new HomeView();
    $("main").append(home.render().$el);
  },

  users: function(pageId){
    $("main").html("");

    var header = new HeaderView();
    $("main").append(header.render().$el);

    var collection = new UsersCollection();
    var users = new UsersView({
      pageId: Number(pageId),
      collection: collection
    });

    collection.fetch({
      success: function(){
        $("main").append(users.render().$el);
      }
    });
  },

  userProfile: function(){
    var userId = this.id;
    var userProfile = new UserProfileView();
    $("main").html(userProfile.render().$el);
  }
});

var router = new Router();

Backbone.history.start();
