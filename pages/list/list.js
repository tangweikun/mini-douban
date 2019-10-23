Page({
  data: {
    start: 0,
    movies: [],
  },

  onLoad: function() {
    this._loadMore();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this._loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  _loadMore: function() {
    const that = this;
    wx.showToast({ title: '加载中', icon: 'loading', duration: 2000 });
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/top250?start=' + that.data.start,
      header: { 'content-type': 'json' },
      success: function(res) {
        that.setData({
          movies: [...that.data.movies, ...res.data.subjects],
          start: that.data.start + 20,
        });
      },
    });
  },

  _goDetail: function(e) {
    //拿到点击的index下标
    // const index = e.currentTarget.dataset.index;
    // console.log(this.data.movies[index]);
    // const movie = JSON.stringify(this.data.movies[index]);
    // wx.navigateTo({
    //   url: '../detail/detail?movie=' + movie,
    // });
  },
});
