import React from 'react';
import './ViewQuiz.css';
import qs from 'qs';
import axios from 'axios';

export default class ViewQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            quiz: {},
            isLoading: true, 
            isAuthenticated: true, 
            inputVal: ''
        }
    }

    checkAuth = () => {
        if (this.state.quiz.mustBeSigned && localStorage.getItem('JWT_PAYLOAD') && localStorage.getItem('_ID')) {
            this.setState({isAuthenticated: true})
        } else if (this.state.quiz.mustBeSigned) {
            this.setState({isAuthenticated: false});
        }
    }

    componentDidMount() {
        let id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id;
        this.setState({ id: id });
        this.refreshQuiz();
    }

    refreshQuiz = () => {
        axios.get('/api/quizzes/get-quiz/' + qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id).then(res => {
            if (res.data) {
                this.setState({isLoading: false, quiz: res.data.quiz});
                this.checkAuth();
            }
        }).catch(er => {
            console.log(er);
        })
    }

    startQuiz = () => {
        this.props.history.push({ 
            pathname: "/take-quiz/" + this.state.id,
            state: {
                quiz: this.state.quiz
            }
        })
    }

    addComment = () => {
        if (!this.state.inputVal.length) return;
        axios.post('/api/quizzes/add-comment', {quizId: this.state.id, message: this.state.inputVal, sentFromId: localStorage.getItem('_ID')}).then(res => {
            if (res.data) {
                this.refreshQuiz();
                this.setState({inputVal: ''});
            }
        }).catch(er => {
            console.log(er);
        })
    }

    render() {
        return !this.state.isLoading ? (
            <div className="view-quiz">
                {!this.state.isAuthenticated ? <div className="not-auth">Du skal v??re logget ind</div> : 
                <div className="content">
                    <div className="header">
                        {this.state.quiz.name}
                    </div>
                    <div className="body">
                        <div className="left">
                            <div className="description">{this.state.quiz.description}</div>
                            <div className="comments">
                                {this.state.quiz.comments.map((com, idx) => (
                                    <div className="comment" key={idx}>
                                        <img style={{borderRadius: '100%'}} className="img" src="https://img.pngio.com/png-avatar-108-images-in-collection-page-3-png-avatar-300_300.png" alt='default profile icon' />
                                        <div>{com.message}</div>
                                        <div>{com.sentFromName}</div>
                                    </div>
                                ))}
                                <div className="input-field">
                                    <input value={this.state.inputVal} onChange={e => this.setState({inputVal: e.target.value})} type="text" placeholder="Tilf??j en ny kommentar" />
                                    <button onClick={this.addComment}>Send</button>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="questions-num">{this.state.quiz.questions.length} Sp??rgsm??l</div>
                            <div className={this.state.quiz.createdBy === localStorage.getItem('_ID') ? 'questions-wrapper' : 'questions-wrapper no-scroll'}>
                                {this.state.quiz.questions.map((question, idx) => (
                                    <div className="question" key={idx}>
                                        <div>{this.state.quiz.createdBy === localStorage.getItem('_ID') ? question.questionName : 'question name'}</div>
                                        <div>{this.state.quiz.createdBy === localStorage.getItem('_ID') ? question.correctAnswer : 'answer'}</div>
                                    </div>
                                ))}
                                {this.state.quiz.createdBy !== localStorage.getItem('_ID') ? <div className="hidden"><div>Du skal have lavet denne quiz f??r du kan se sp??rgsm??lene</div></div> : ''}
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <div className="buttons-wrapper">
                            <button onClick={() => this.props.history.goBack()}>Tilbage</button>
                            <button onClick={this.startQuiz}>Tag denne quiz</button>
                        </div>
                    </div>
                </div>
                }
            </div>
        ) : <h2>Loader</h2>
    }
}