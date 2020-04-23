import React, { Component } from 'react'

export default class Subscription extends Component {
  render() {
    return (
      <div>
            <div className="row">
            <div className="col-md-3">
              <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Email and SMS</a>
              </div>
            </div>
            <div className="col-md-9">
              <div className="tab-content" id="v-pills-tabContent">
              <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                  <p>Subscribe To:</p>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                    <label className="form-check-label">
                      Feedback Emails
                            </label>
                    <small className="form-text text-muted">Give feedback on Instagram.</small>
                  </div>
                  <br />
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" />
                    <label className="form-check-label">
                      Reminder Emails
                            </label>
                    <small className="form-text text-muted">Get notifications you may have missed.</small>
                  </div>
                  <br />
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                    <label className="form-check-label">
                      Product Emails
                            </label>
                    <small className="form-text text-muted">Get tips about Instagram's tools.</small>
                  </div>
                  <br />
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" />
                    <label className="form-check-label">
                      News Emails
                            </label>
                    <small className="form-text text-muted">Learn about new Instagram features.</small>
                  </div>
                  <br />
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" />
                    <label className="form-check-label">
                      Text (SMS) Messages
                            </label>
                    <small className="form-text text-muted">Get notifications by text message.</small>
                  </div>
                </div>
                </div>
                </div>
                </div>
      </div>
    )
  }
}
