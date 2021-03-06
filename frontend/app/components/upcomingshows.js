import React from 'react';
import {Link, hashhistory} from 'react-router';

import {Grid, Cell, Card, CardTitle, CardText, CardActions, Button} from 'react-mdl';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import Api from '../constants/api';

import * as UpcomingShowsAction from '../actions/upcomingshowsAction';
import UpcomingShowsStore from '../stores/upcomingshowsStore';


export default class UpcomingShows extends React.Component{

	constructor(){
		super();
		this.state = {
			UpcomingShowsList : [],
			user_id: Api._getKey('user_id') || "",
		};
		this._upcomingShowsStoreChange = this._upcomingShowsStoreChange.bind(this);
	}


	componentWillMount(){
		UpcomingShowsAction._getUpcomingShowsList("");
		UpcomingShowsStore.on('change', this._upcomingShowsStoreChange);
	}

	componentWillUnmount(){
		UpcomingShowsStore.removeListener('change', this._upcomingShowsStoreChange);	
	}

	_upcomingShowsStoreChange(type){
		if(type=="Upcoming_Shows"){
			let upcomingShows = UpcomingShowsStore._getUpcomingShowsList();
			console.log('UpcomingShowsList', upcomingShows);
			this.setState({
				UpcomingShowsList : upcomingShows || [],
			});
		}
	}

	_setMyShowsUI(){		
		let uiItem = [];
		let movieName = '';
		let imageUrl;
		let uid, theatre, ticket_price;
		uiItem = this.state.UpcomingShowsList.map((item, index)=> {
			movieName = item.title || "Movie Name";
			imageUrl = item.poster_url || "http://www.getmdl.io/assets/demos/dog.png";
			uid = item.show_id || "";
			theatre = item.theatre || "";
			ticket_price = item.ticket_price || '';
			
			return(
				<Card key={index} shadow={0} style={{width: '220px', height: '300px', display:'inline-flex', marginLeft: '10px', marginTop: '10px'}}>
				    <CardTitle expand style={{color: '#fff', background: `url(${imageUrl}) no-repeat #46B6AC `}}/>
				    <CardText  style = {{'fontSize': '12px'}}>
				    	{movieName}<br/>
				    	Ticket: {ticket_price}<br/>
				    	Theatre: {theatre}<br/>
				        Show Time: {new Date(item.show_time).toDateString() || ""}
				    </CardText>
				    <CardActions border>
				        <Button colored><Link to={`showdetails/${uid}`}>View Details</Link></Button>
				        {this.state.user_id == item.thetre_id ? <img src="heart.png" alt="Yes" style={{width: '15px', height: '15px', float: 'right', marginTop: '10px'}}/> : ""}
		     		</CardActions>
				</Card>);
		});
		return uiItem;
	}


	render(){
		return(
			<div>
				{this._setMyShowsUI()}
			</div>
		);
	}
}