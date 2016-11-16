window.TitleLink = React.createClass({
    render:function (){
        return(
            <a href={this.props.loanType==1?'../invest-detail/person-detail.html':'../invest-detail/enterprise-detail.html'} title={this.props.title}>{this.props.title}</a>
        );
    }
});