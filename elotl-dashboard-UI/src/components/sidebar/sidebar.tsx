import React from 'react';
import './style.scss';
// import { Link } from 'react-router-dom';
import logo from '../../images/Logo.png';
import { menuItem } from '../../constants/sidebarConstants'

class Sidebar extends React.Component<{}, {}> {
    render() {
        return (
            <div className="sidebar">
                <img src={logo} alt="logo" className="logo" />
                <ul className="sidebar-list">
                    <li>
                        <div className="container">
                            <div className="sidebr-card">
                                <div className="face face1">
                                    <div className="content">
                                        <div className="icon">
                                            <svg id="Layer_13" data-name="Layer 13" xmlns="http://www.w3.org/2000/svg" width="22.926" height="22.926" viewBox="0 0 22.926 22.926">
                                                <path id="Path_355" data-name="Path 355" d="M13.371,3H3.546A.546.546,0,0,0,3,3.546v7.1a.546.546,0,0,0,.546.546h9.825a.546.546,0,0,0,.546-.546v-7.1A.546.546,0,0,0,13.371,3Zm-.546,7.1H4.092v-6h8.734Z" transform="translate(-3 -3)" fill="#171c31" />
                                                <path id="Path_356" data-name="Path 356" d="M13.371,20H3.546A.546.546,0,0,0,3,20.546V33.1a.546.546,0,0,0,.546.546h9.825a.546.546,0,0,0,.546-.546V20.546A.546.546,0,0,0,13.371,20Zm-.546,12.555H4.092V21.092h8.734Z" transform="translate(-3 -10.721)" fill="#171c31" />
                                                <path id="Path_357" data-name="Path 357" d="M35.371,30H25.546a.546.546,0,0,0-.546.546v7.1a.546.546,0,0,0,.546.546h9.825a.546.546,0,0,0,.546-.546v-7.1A.546.546,0,0,0,35.371,30Zm-.546,7.1H26.092v-6h8.734Z" transform="translate(-12.991 -15.262)" fill="#171c31" />
                                                <path id="Path_358" data-name="Path 358" d="M35.371,3H25.546A.546.546,0,0,0,25,3.546V16.1a.546.546,0,0,0,.546.546h9.825a.546.546,0,0,0,.546-.546V3.546A.546.546,0,0,0,35.371,3Zm-.546,12.555H26.092V4.092h8.734Z" transform="translate(-12.991 -3)" fill="#171c31" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="face face2">
                                    <div className="content">
                                        <p>{menuItem.DASHBOARD}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="active-tab">
                        <div className="container">
                            <div className="sidebr-card">
                                <div className="face face1">
                                    <div className="content">
                                        <div className="icon">
                                            <svg id="Group_757" data-name="Group 757" xmlns="http://www.w3.org/2000/svg" width="23.881" height="22.926" viewBox="0 0 23.881 22.926">
                                                <g id="Clusters">
                                                    <path id="Path_348" data-name="Path 348" d="M14.269,13.731a4.537,4.537,0,1,0-4.537,4.537A4.537,4.537,0,0,0,14.269,13.731Zm1.194,0a5.731,5.731,0,1,0-5.731,5.731A5.731,5.731,0,0,0,15.463,13.731Z" transform="translate(-4 -4.179)" fill="#333" fill-rule="evenodd" />
                                                    <path id="Path_349" data-name="Path 349" d="M11.537,23.866a1.672,1.672,0,1,0-1.672,1.672A1.672,1.672,0,0,0,11.537,23.866Zm1.194,0a2.866,2.866,0,1,0-2.866,2.866A2.866,2.866,0,0,0,12.731,23.866Z" transform="translate(-4.134 -4.761)" fill="#333" fill-rule="evenodd" />
                                                    <path id="Path_350" data-name="Path 350" d="M26.537,15.866a1.672,1.672,0,1,0-1.672,1.672A1.672,1.672,0,0,0,26.537,15.866Zm1.194,0a2.866,2.866,0,1,0-2.866,2.866A2.866,2.866,0,0,0,27.731,15.866Z" transform="translate(-4.806 -4.403)" fill="#333" fill-rule="evenodd" />
                                                    <path id="Path_351" data-name="Path 351" d="M21.448,7.821a2.627,2.627,0,1,0-2.627,2.627A2.627,2.627,0,0,0,21.448,7.821Zm1.194,0a3.821,3.821,0,1,0-3.821,3.821A3.821,3.821,0,0,0,22.642,7.821Z" transform="translate(-4.492 -4)" fill="#333" fill-rule="evenodd" />
                                                    <path id="Path_352" data-name="Path 352" d="M27.627,23.91a.716.716,0,1,0-.716.716A.716.716,0,0,0,27.627,23.91Zm1.194,0a1.91,1.91,0,1,0-1.91,1.91A1.91,1.91,0,0,0,28.821,23.91Z" transform="translate(-4.94 -4.806)" fill="#333" fill-rule="evenodd" />
                                                    <path id="Path_353" data-name="Path 353" d="M18.716,15.955a.239.239,0,1,0,.239-.239A.239.239,0,0,0,18.716,15.955Zm1.194,0a.955.955,0,1,0-.955.955A.955.955,0,0,0,19.91,15.955Z" transform="translate(-4.627 -4.492)" fill="#333" fill-rule="evenodd" />
                                                    <path id="Path_354" data-name="Path 354" d="M21.448,23.821a2.627,2.627,0,1,0-2.627,2.627A2.627,2.627,0,0,0,21.448,23.821Zm1.194,0a3.821,3.821,0,1,0-3.821,3.821A3.821,3.821,0,0,0,22.642,23.821Z" transform="translate(-4.492 -4.716)" fill="#333" fill-rule="evenodd" />
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="face face2">
                                    <div className="content">
                                        <p>{menuItem.NODELESS_CLUSTERS}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="container">
                            <div className="sidebr-card">
                                <div className="face face1">
                                    <div className="content">
                                        <div className="icon">
                                            <svg id="report" xmlns="http://www.w3.org/2000/svg" width="18.023" height="21.807" viewBox="0 0 18.023 21.807">
                                                <g id="Group_751" data-name="Group 751" transform="translate(0 0)">
                                                    <g id="Group_750" data-name="Group 750">
                                                        <path id="Path_359" data-name="Path 359" d="M27.508,2.5H15.126A1.223,1.223,0,0,0,13.91,3.715V5.71H11.915A1.223,1.223,0,0,0,10.7,6.926V23.091a1.223,1.223,0,0,0,1.215,1.215H24.3a1.223,1.223,0,0,0,1.215-1.215V21.1h1.995a1.223,1.223,0,0,0,1.215-1.215V3.715A1.239,1.239,0,0,0,27.508,2.5ZM24.527,23.069a.206.206,0,0,1-.206.206H11.938a.226.226,0,0,1-.229-.206V6.9a.212.212,0,0,1,.229-.206h1.995V19.881A1.223,1.223,0,0,0,15.148,21.1h9.379Zm3.187-3.187a.23.23,0,0,1-.229.229H15.126a.23.23,0,0,1-.229-.229V3.715a.23.23,0,0,1,.229-.229H27.508a.23.23,0,0,1,.229.229V19.881Z" transform="translate(-10.7 -2.5)" fill="#171c31" />
                                                        <path id="Path_360" data-name="Path 360" d="M46.588,53.2H39.2a.5.5,0,0,0,0,1.009h7.361a.5.5,0,0,0,.023-1.009Z" transform="translate(-32.28 -41.574)" fill="#171c31" />
                                                        <path id="Path_361" data-name="Path 361" d="M46.588,66.2H39.2a.5.5,0,1,0,0,1.009h7.361a.5.5,0,0,0,.023-1.009Z" transform="translate(-32.28 -51.593)" fill="#171c31" />
                                                        <path id="Path_362" data-name="Path 362" d="M46.588,40.3H39.2a.5.5,0,0,0,0,1.009h7.361a.509.509,0,0,0,.5-.5A.49.49,0,0,0,46.588,40.3Z" transform="translate(-32.28 -31.632)" fill="#171c31" />
                                                        <path id="Path_363" data-name="Path 363" d="M49.426,21.006a1.9,1.9,0,0,0,1.88-1.789.108.108,0,0,0-.115-.115H49.518a.108.108,0,0,1-.115-.115V17.315a.108.108,0,0,0-.115-.115,1.905,1.905,0,0,0,.138,3.806Z" transform="translate(-39.062 -13.829)" fill="#171c31" />
                                                        <path id="Path_364" data-name="Path 364" d="M58.915,16.1h1.674a.108.108,0,0,0,.115-.115A1.923,1.923,0,0,0,58.915,14.2a.108.108,0,0,0-.115.115v1.674A.108.108,0,0,0,58.915,16.1Z" transform="translate(-47.771 -11.517)" fill="#171c31" />
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="face face2">
                                    <div className="content">
                                        <p>{menuItem.COST_ANALYSIS}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="container">
                            <div className="sidebr-card">
                                <div className="face face1">
                                    <div className="content">
                                        <div className="icon">
                                            <svg id="noun_report_1054891" xmlns="http://www.w3.org/2000/svg" width="22.431" height="22.431" viewBox="0 0 22.431 22.431">
                                                <g id="Group_759" data-name="Group 759" transform="translate(0 0)">
                                                    <path id="Path_368" data-name="Path 368" d="M25.607,26.636V20.995H21.592v5.641H19.037V7.921H14.989V26.636H12.434V15.752H8.419V26.636H6.2V5.2h-1V27.631H27.631v-1H25.607Zm-16.193,0V16.747h2.024v9.888Zm6.57,0V8.916h2.024V26.636Zm6.6,0V21.99h2.024v4.646Z" transform="translate(-5.2 -5.2)" fill="#171c31"/>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="face face2">
                                    <div className="content">
                                        <p>{menuItem.REPORTS}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="container">
                            <div className="sidebr-card">
                                <div className="face face1">
                                    <div className="content">
                                        <div className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22.921" height="22.926" viewBox="0 0 22.921 22.926">
                                                <path id="Settings" d="M12.208,22.946H10.722a1.353,1.353,0,0,1-1.146-.635c-.108-.17-.766-1.273-1.1-1.926L7.287,19.9c-.725.229-2.029.555-2.142.582a1.357,1.357,0,0,1-1.263-.362L2.83,19.064A1.355,1.355,0,0,1,2.467,17.8c.046-.2.358-1.442.582-2.142l-.488-1.183c-.688-.349-1.834-1.043-1.926-1.1A1.353,1.353,0,0,1,0,12.228v-1.49A1.353,1.353,0,0,1,.635,9.591c.17-.108,1.273-.766,1.926-1.1L3.05,7.307c-.229-.725-.555-2.029-.582-2.142A1.357,1.357,0,0,1,2.83,3.9L3.882,2.85a1.355,1.355,0,0,1,1.263-.362c.2.046,1.442.358,2.142.582L8.47,2.581C8.819,1.893,9.514.747,9.571.655A1.353,1.353,0,0,1,10.718.02H12.2A1.353,1.353,0,0,1,13.35.655c.108.17.766,1.273,1.1,1.926l1.183.488c.725-.229,2.029-.555,2.142-.582a1.357,1.357,0,0,1,1.263.362L20.092,3.9a1.355,1.355,0,0,1,.362,1.263c-.046.2-.358,1.442-.582,2.142L20.36,8.49c.688.349,1.834,1.043,1.926,1.1a1.353,1.353,0,0,1,.635,1.147v1.486a1.353,1.353,0,0,1-.635,1.146c-.17.108-1.273.766-1.926,1.1l-.479,1.188c.229.725.555,2.029.582,2.142a1.357,1.357,0,0,1-.362,1.263l-1.053,1.053a1.357,1.357,0,0,1-1.263.362c-.2-.046-1.442-.358-2.142-.582l-1.183.488c-.349.688-1.043,1.834-1.1,1.926a1.353,1.353,0,0,1-1.151.635ZM7.322,18.534,9.4,19.4l.1.229c.211.459.972,1.747,1.147,2.011a.087.087,0,0,0,.076.041h1.486a.087.087,0,0,0,.076-.041c.135-.216.917-1.523,1.147-2.011l.1-.229,2.087-.864.229.085c.475.174,1.922.546,2.227.619a.078.078,0,0,0,.08-.023l1.053-1.053a.08.08,0,0,0,.023-.08c-.057-.245-.429-1.724-.619-2.227l-.085-.229.86-2.082.229-.1c.459-.211,1.747-.972,2.011-1.147a.087.087,0,0,0,.041-.076V10.733a.087.087,0,0,0-.041-.076h0c-.216-.135-1.523-.917-2.011-1.147l-.229-.1-.864-2.087.085-.229c.174-.475.546-1.922.619-2.227a.087.087,0,0,0-.023-.08L18.156,3.732a.08.08,0,0,0-.08-.023c-.245.057-1.72.429-2.227.619l-.229.085-2.091-.86-.1-.229c-.211-.459-.972-1.747-1.147-2.011a.087.087,0,0,0-.076-.041H10.727a.087.087,0,0,0-.076.041c-.135.216-.917,1.523-1.147,2.011l-.1.229-2.087.864-.229-.085c-.475-.174-1.922-.546-2.227-.619a.078.078,0,0,0-.08.023L3.726,4.79a.08.08,0,0,0-.023.08c.057.245.429,1.724.619,2.227l.085.229-.86,2.091-.229.1c-.459.211-1.747.972-2.011,1.147a.087.087,0,0,0-.041.076v1.486a.087.087,0,0,0,.041.076c.216.135,1.523.917,2.011,1.147l.229.1.864,2.087-.085.229c-.174.475-.546,1.922-.619,2.227a.087.087,0,0,0,.023.08l1.053,1.053a.08.08,0,0,0,.08.023c.245-.057,1.72-.429,2.227-.619Zm4.144-1.7a5.357,5.357,0,1,1,5.357-5.357,5.357,5.357,0,0,1-5.357,5.357Zm0-9.445a4.088,4.088,0,1,0,4.088,4.088,4.088,4.088,0,0,0-4.088-4.088Z" transform="translate(0 -0.02)" fill="#171c31" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="face face2">
                                    <div className="content">
                                        <p>{menuItem.SETTINGS}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>

                </ul>
            </div>
        );
    }
}

export default Sidebar;