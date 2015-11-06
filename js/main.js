var tweets = 'https://twitter-pi.herokuapp.com/tweets';


var UsersCollection = Backbone.Collection.extend({
    url: 'https://twitter-pi.herokuapp.com/users?include=tweets'
});



var HeaderView = Backbone.View.extend({
  template: _.template($("#header").html()),

  className: "header",

  render: function(){
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

  render: function(){
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
  },

  render: function(){
    this.$el.html(this.template({
      page: this.pageId + 1,
      users: this.collection.toJSON()
    }));
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

    var header = new HeaderView();
    $("main").append(header.render().$el);

    var homepage = new HomepageView();
    $("main").append(homepage.render().$el);
  },

  login: function(){
    $("main").html("");

    var header = new HeaderView();
    $("main").append(header.render().$el);

    var login = new LoginView();
    $("main").append(login.render().$el);
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
