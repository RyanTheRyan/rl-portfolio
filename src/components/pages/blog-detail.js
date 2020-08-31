import React, { Component } from 'react';
import axios from 'axios';
import ReactHtmlParser from "react-html-parser";
import BlogFeaturedImage from '../blog/blog-featured-image';
import BlogForm from "../blog/blog-form";

export default class BlogDetail extends Component {
  constructor(props) {
      super(props)

      this.state = {
          currentId: this.props.match.params.slug,
          blogItem: {},
          editMode: false
      }
      this.handleEditClick = this.handleEditClick.bind(this);
      this.handleFeaturedImageDelete = this.handleFeaturedImageDelete.bind(this);
      this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
  }

  handleEditFormSubmission(blog) {
      this.setState({
          blogItem: blog,
          editMode: false
      })
  }

  handleFeaturedImageDelete() {
      this.setState({
          blogItem: {
              featured_image_url: ""
          }
      })
  }

  handleEditClick() {
      console.log("Handled edit click")
      this.setState({ editMode: true });
  }

  getBlogItem() {
      axios.get(`https://ryanlowe.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`
      ).then(response => {
          this.setState ({
              blogItem: response.data.portfolio_blog
          })
      }).catch(error => {
          console.log("getBlogItem error", error)
      })
  }

  componentDidMount() {
      this.getBlogItem();
  }

  render() {
      const {
          title,
          content,
          featured_image_url,
          blog_status
      } = this.state.blogItem

      const contentManager = () => {
          if (this.state.editMode && this.props.loggedInStatus === "LOGGED_IN") {
              return <BlogForm handleFeaturedImageDelete={this.handleFeaturedImageDelete} editMode={this.state.editMode} blog={this.state.blogItem} />
          } else {
              return (
                <div className="content-container">
                    <h1>{title}</h1>
                    <BlogFeaturedImage img={featured_image_url}/>
                    <div className="content">{ReactHtmlParser(content)}</div>
                    <h1 onClick={this.handleEditClick}>Edit Blog</h1>
              </div>
              )
          }
      }

      return (
          <div className="blog-container">
              {contentManager()}
          </div>
      )
  }
}