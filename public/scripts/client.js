// Create, Render, GET and POST tweet functions

var $;
$(function() {
  const addTweet = {
    successfulTweet: function (event) {
      event.preventDefault();
      const input = $("textarea");
      if (input.val().length > 140) {
        $(".submit-tweet").prepend($("<div>").addClass("tweet-error").text("Maximum of 140 characters.").fadeIn(200).fadeOut(4500));
        return;
      }
      if (!input.val()) {
        $(".submit-tweet").prepend($("<div>").addClass("tweet-error").text("Please enter text before tweeting.").fadeIn(200).fadeOut(4500));
        return;
      }
      if (input.val() === null) {
        $(".submit-tweet").prepend($("<div>").addClass("tweet-error").text("Please enter text before tweeting.").fadeIn(200).fadeOut(4500));
        return;
      }
      const tweetContent = $(".submit-tweet").serialize();
      $.post("/tweets", tweetContent, function () {
        $("textarea").val("");
        loadTweets();
      });
    },
  };
  $(".submit-tweet").submit(addTweet.successfulTweet);

function loadTweets() {
  $.ajax({
    url: "/tweets",
    method: "GET",
    data: $(".submit-tweet").serialize(),
    dataType: "json",
    success: function (data) {
      renderTweets(data);
    }
  });
}
loadTweets();

  const renderTweets = function(tweets) {
    $(".all-tweets").empty();
    tweets.forEach(tweetData => {
      $(".all-tweets").prepend(createTweetElement(tweetData));
    });
  }
  $(".compose").on("click", function () {
    $(".new-tweet").slideToggle("fast", function() {
    });
    $("textarea").focus();
  });
  $(".compose").on("click", function () {
    $(".compose").stop().toggleClass("compose-clicked");
  });

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  const createTweetElement = function(tweet) {
    const $tweet = $("<article>").addClass("tweet");
    const $img = $("<img>").addClass("avatar").attr("src", tweet.user.avatars.small);
    const $handle = $("<p>").addClass("handle").text(tweet.user.handle);
    const $user = $("<p>").addClass("user").text(tweet.user.name);
    const $header = $("<header>")
      .append($img)
      .append($user)
      .append($handle);
    $tweet.append($header);
    const $contentDetail = $("<p>").addClass("tweet-detail").text(tweet.content.text);
    const $contentContainer = $("<div>").addClass("tweet-content").append($contentDetail);
    $tweet.append($contentContainer);
    const createdAt = $("<p>").text(timeSince(tweet.created_at) + " ago");
    const favouriteIcon = $("<i>").addClass("fa fa-star-o");
    const retweetIcon = $("<i>").addClass("fa fa-retweet");
    const flagIcon = $("<i>").addClass("fa fa-exclamation-triangle");
    const $footerTime = $("<div>").addClass("time-ago").append(createdAt);
    const $footerIcons = $("<div>").addClass("icons").append(favouriteIcon, retweetIcon, flagIcon);
    const $footer = $("<footer>")
      .append($footerTime)
      .append($footerIcons);
    $tweet.append($footer);
    return $tweet;
  }
});
