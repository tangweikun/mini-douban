Page({
  data: {
    movie: '',
  },

  onLoad: function(options) {
    var that = this;
    var movie = JSON.parse(options.movie);
    that.setData({
      movie: movie,
    });
  },

  onShareAppMessage: function() {},
});
