 import React from "react";
 import { HashRouter as Router, Route, Link } from "react-router-dom";
 import { connect } from "react-redux";
 import Divider from "@material-ui/core/Divider";


import { setCurrentProvider, fetchProvider } from "../../actions";

 class Profile extends React.Component {
   constructor(props) {
     super(props);
   }

   componentDidMount() {
     const id = this.props.match.params.id;
   }

   componentDidUpdate() {
     const id = this.props.match.params.id;

      // get the provider from global redux state'
     const currentProvider =
       this.props.providers.length > 0 &&
       this.props.providers.find(provider => provider.id == id);
     currentProvider && this.props.setCurrentProvider(currentProvider);
   }

   render() {
     let aProvider = this.props.provider;

     let liveProvider = this.props.providers.find(
       item => item.id == aProvider.id
     );
     if (liveProvider) {
       aProvider = liveProvider;
     }

     if (!aProvider) {
       aProvider = {
         id: 1,
         name: "Temp default provider",
         description: "Somthing isnt quite lining up",
         address: "??????",
         phone: "(04) ...---...",
         update_message: "not really functional",
         lat: -41.300598,
         long: 174.774082,
         email: "BlameBarry@Garry.com",
         website_url: "http:ComputerSaysNo.org.nz/",
         hours: "Open: untill something changes",
         services: []
       };
     }

     let services = [];
     if (aProvider.services) {
       services = aProvider.services.map(() => { });
     }

     return (
       <div>
         <div className="theBackground">
           {/* <div classname="grid_container profileContainer"> */}
           <div className="profileContainer">
             {/* <div classname="profile_header profileImage"> */}
             <div className="profileHeader">
               <img src="/images/img-1.jpeg" className="profileImage" />
             </div>
             <fieldset className="profileInfo">
               <h3>{aProvider.name ? aProvider.name : ""}</h3>
               <p>{aProvider.address ? aProvider.address : ""}</p>
               <p>{aProvider.phone ? aProvider.phone : ""}</p>
               <p>
                 Site:{" "}
                 {aProvider.website_url ? (
                   <a href={aProvider.website_url}>{aProvider.name}</a>
                 ) : (
                     ""
                   )}
               </p>
               <div>
                 Hours:{" "}
                 {aProvider.hours
                   ? aProvider.hours
                     .split("<br>")
                     .map((item, i) => <p key={"time" + i}>{item}</p>)
                   : ""}
               </div>
             </fieldset>

             <fieldset className="profileDescription">
               {/* <div className="profile_body"> */}
               <fieldset>
                 <span>
                   {aProvider.update_message ? aProvider.update_message : ""}
                 </span>
               </fieldset>
               <div>
                 <div>
                   {aProvider.description
                     ? aProvider.description
                       .split("<br>")
                       .map((item, i) => <p key={"desc" + i}>{item}</p>)
                     : ""}
                 </div>
               </div>
             </fieldset>
           </div>
         </div>
       </div>
     );
   }
 }

 const mapStateToProps = state => {
   return {
     provider: state.currentProvider.currentProvider,
     providers: state.providers.providers
   };
 };

 const mapDispatchToProps = dispatch => {
   return {
     fetchProvider: params => {
       return dispatch(fetchProvider(params));
     },
     setCurrentProvider: params => {
       return dispatch(setCurrentProvider(params));
     }
   };
 };

 export default connect(
   mapStateToProps,
   mapDispatchToProps
 )(Profile);



