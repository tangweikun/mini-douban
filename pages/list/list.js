var start = 0;
Page({
  start: 0,
  data: {
    movies: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    this.loadMore(that);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    start = 0;
    var that = this;
    this.loadMore(that);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;

    this.loadMore(that);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  loadMore: function(that) {
    that.getMovie(function(d) {
      //回调函数，根据数据设置页面data，更新到视图
      wx.hideToast(); //隐藏加载框
      var list = that.data.movies;
      for (var i = 0; i < d.length; i++) {
        list.push(d[i]);
      }
      that.setData({ movies: list }); //更新数据，视图将同步更新
    });
  },

  getMovie: function(fn) {
    wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/top250?start=' + start,
      header: { 'content-type': 'json' },
      success: function(res) {
        start = start + 20;
        console.log(res);
        fn(res.data.subjects);
      },
    });
  },

  goDetail: function(e) {
    var that = this;
    //拿到点击的index下标
    var index = e.currentTarget.dataset.index;
    var movie = JSON.stringify(that.data.movies[index]);
    wx.navigateTo({
      url: '../detail/detail?movie=' + movie,
    });
  },
});
