import React from "react";
import "../../scss/components/Feed.scss";
import axios from "axios";
import styled from "styled-components";
import { Youtube } from "styled-icons/fa-brands/Youtube";
import { Twitter } from "styled-icons/fa-brands/Twitter";
import { Instagram } from "styled-icons/fa-brands/Instagram";
import { ExternalLinkAlt } from "styled-icons/fa-solid/ExternalLinkAlt";
import { User } from "styled-icons/fa-solid/User";
import TestAvatar from "../../assets/test-avatar.png";
import numeral from "numeral";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import moment from "moment";

const PostYoutube = styled(Youtube)`
  color: #fa0202;
  background: #fa02021f;
  padding: 4px;
  border-radius: 50px;
  height: 30px;
  width: 30px;
`;

const PostTwitter = styled(Twitter)`
  color: #1da1f3;
  background: #1da1f31f;
  padding: 4px;
  border-radius: 50px;
  height: 30px;
  width: 30px;
`;

const PostInstagram = styled(Instagram)`
  color: #000;
  background: rgb(221, 221, 221);
  padding: 4px;
  border-radius: 50px;
  height: 30px;
  width: 30px;
`;

const PostUser = styled(User)`
  color: #2e3035;
  background: #1d1f24;
  padding: 4px;
  border-radius: 50px;
  height: 36px;
  width: 36px;
`;

const PostLink = styled(ExternalLinkAlt)`
  color: rgb(139, 139, 139);
  height: 15px;
  width: 15px;
`;

const PostLoader = () => (
  <svg
    width="236"
    height="270"
    viewBox="0 0 236 270"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="236" height="270" rx="12" fill="#2E3035" />
    <circle cx="35" cy="37" r="19" fill="#26282E" />
    <rect x="21" y="73" width="195" height="93" fill="#26282E" />
    <rect x="21" y="183" width="195" height="16" rx="8" fill="#26282E" />
    <rect x="21" y="206" width="113" height="16" rx="8" fill="#26282E" />
    <rect x="62" y="29" width="113" height="16" rx="8" fill="#26282E" />
  </svg>
);

class Feed extends React.Component {
  state = {
    gettingFeed: null,
    gettingFeedSuccess: null,
    gettingFeedFailure: null,
    error: null,
    feed: null,
    nextPage: 0
  };

  componentDidMount() {
    this.fetchFeed();
    window.onscroll = e => {
      e.preventDefault();
      if (
        window.innerHeight + window.scrollY + 800 >=
        document.body.offsetHeight
      ) {
        if (!this.state.gettingFeed) {
          this.fetchFeed(this.state.nextPage);
        }
      }
    };
  }

  toggleDetails = () => {
    this.setState({});
  };

  fetchFeed = async (nextPage = 0) => {
    // axios.defaults.timeout = 10000;
    try {
      this.setState({ gettingFeed: true, gettingFeedFailure: false });
      const URI = `http://localhost:8100/api/feeds/public/${nextPage}`;
      const res = await axios.get(URI);

      if (this.state.nextPage) {
        this.setState({
          gettingFeed: null,
          gettingFeedSuccess: true,
          feed: [...this.state.feed, ...res.data.items],
          nextPage: res.data.nextPageToken
        });
      } else {
        this.setState({
          gettingFeed: null,
          gettingFeedSuccess: true,
          feed: res.data.items,
          nextPage: res.data.nextPageToken
        });
      }
    } catch (error) {
      console.error(error);
      this.setState({
        gettingFeed: null,
        gettingFeedSuccess: null,
        gettingFeedFailure: true,
        error: null,
        feed: null,
        nextPage: 0
      });
    }
  };

  render() {
    const array = new Array(16).fill("");
    return (
      <div className="feed-container">
        <div className="feed">
          <h1>Top Posts</h1>

          {this.state.gettingFeed && !this.state.feed && (
            <div className="loader-container">
              {array.map((_, i) => {
                // change key
                return (
                  <div className="loader" key={i}>
                    <PostLoader />
                  </div>
                );
              })}
            </div>
          )}
          {this.state.gettingFeedSuccess && this.state.feed && (
            <div className="general">
              {this.state.feed.map((post, i) => {
                if (post.kind === "youtube#video") {
                  return (
                    // change key
                    <a
                      href={`https://www.youtube.com/watch?v=${post.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="post"
                      key={i}
                    >
                      <span className="source">
                        <span className="media">
                          {/* <img src={TestAvatar} alt="testavatar" /> */}
                          <PostUser />
                          <p>{post.snippet.channelTitle}</p>
                        </span>
                        <span>
                          <PostYoutube />
                        </span>
                      </span>
                      <div className="preview">
                        <img src={post.snippet.thumbnails.medium.url} alt="" />
                        <p className="title">{post.snippet.title}</p>
                        <p>
                          {numeral(post.statistics.viewCount).format("0.0a")}{" "}
                          views · {moment(post.snippet.publishedAt).fromNow()}
                        </p>
                      </div>
                      <div className="options">
                        <p className="details">
                          <span>#{i + 1} </span>
                        </p>
                        <PostLink />
                      </div>
                    </a>
                  );
                }
              })}
              {this.state.gettingFeed && this.state.feed && (
                <div className="loader-spinner">
                  <Loader
                    type="TailSpin"
                    color="rgb(159, 177, 57)"
                    height={50}
                    width={50}
                  />
                </div>
              )}
            </div>
          )
          // <div className="general">
          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostInstagram />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostTwitter />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostInstagram />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostTwitter />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostYoutube />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>
          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostInstagram />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostTwitter />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostYoutube />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>
          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostInstagram />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostTwitter />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostYoutube />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>
          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostInstagram />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostTwitter />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostYoutube />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>
          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostInstagram />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostTwitter />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostYoutube />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>
          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostInstagram />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostTwitter />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostYoutube />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>
          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostInstagram />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostTwitter />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostYoutube />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>
          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostInstagram />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostTwitter />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>

          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostYoutube />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>
          //   <a href="#" className="post">
          //     <span className="source">
          //       <span className="media">
          //         <img src={TestAvatar} alt="testavatar" />
          //       </span>
          //       <span>
          //         <PostYoutube />
          //       </span>
          //     </span>
          //     <div className="preview">preview</div>
          //     <div className="options">
          //       <PostLink />
          //     </div>
          //   </a>
          }
          {this.state.gettingFeedFailure && (
            <p className="error">
              Can't connect{" "}
              <button onClick={() => this.fetchFeed()}>Try again</button>
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Feed;
