import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { convertBytes } from "./helpers";
import moment from "moment";
import box from "../box.jpg";
import "./App.css";

class Main extends Component {
	state = {
		animationType: "",
		displayNone: { display: "" },
		rowDivStyle: {
			all: "",
		},
	};

	fileBtn = () => {
		document.getElementById("defaultBtn").click();
	};

	toggleAnimation = () => {
		this.setState({ animationType: "animate__animated animate__slideOutUp" });
		setTimeout(() => {
			this.setState({ displayNone: { display: "none" } });
			this.setState({
				rowDivStyle: {
					all: "revert",
				},
			});
		}, 1000);

		console.log(typeof this.state.animationType);
	};

	handleBlur = (e) => {
		// e.target.value = "";
	};

	render() {
		return (
			<div className="text-center container-div">
				{/* <img src={box} className="align-top" alt="" className="bg-img" /> */}
				<div className={this.state.animationType} style={this.state.displayNone}>
					<div className="overlay"></div>
					<div className="overlay-div">
						<h1>WELCOME TO FILESAFE</h1>
						<button onClick={this.toggleAnimation}>Get Started</button>
					</div>
				</div>

				<div className="row-div" style={this.state.rowDivStyle}>
					<main className="container">
						<div className="content">
							<p>&nbsp;</p>
							<div>
								<form
									onSubmit={(event) => {
										event.preventDefault();
										const description = this.fileDescription.value;
										this.props.uploadFile(description);
									}}
								>
									<div className="form-div">
										{/* <br></br> */}
										<input
											onBlur={this.handleBlur}
											id="fileDescription"
											type="text"
											ref={(input) => {
												this.fileDescription = input;
											}}
											className="form-input"
											// placeholder="Description"
											autoComplete="off"
											required
										/>
										<label htmlFor="description" className="form-label">
											Description
										</label>
									</div>

									<div className="wrapper input-btn" onClick={this.fileBtn}>
										<div className="image">{/* <img src={box} alt="image" /> */}</div>
										<div className="upload-content">
											<div className="icon">
												<i className="fas fa-cloud-upload-alt"></i>
											</div>
											<div className="text">{this.props.name === null ? "No File Chosen, Yet!" : ""}</div>
										</div>

										{/* <div id="cancel-btn">
											<i className="fas fa-times"></i>
										</div> */}
										<div
											className="file-name"
											style={this.props.name === null ? { display: "none" } : { display: "block" }}
										>
											{this.props.name}
										</div>
									</div>

									<input
										type="file"
										onChange={this.props.captureFile}
										id="defaultBtn"
										className="text-white text-monospace"
										hidden
									/>

									{/* <button id="custom-btn" onClick={}>Choose a File</button> */}
									<button type="submit" id="custom-btn">
										<b>UPLOAD</b>
									</button>
								</form>
							</div>
							<div>
								<Table responsive striped bordered hover variant="" className="table-class">
									<thead>
										<tr className="" style={{ background: "#3a8ffe" }}>
											<th>ID</th>
											<th>Name</th>
											<th>Description</th>
											{/* <th>Type</th> */}
											<th>Size</th>
											<th>Date</th>
											<th>Uploader</th>
											<th>Hash</th>
											<th>Share via Mail</th>
										</tr>
									</thead>
									{this.props.files.map((file, key) => {
										return (
											<tbody key={key}>
												<tr>
													<td>{file.fileId}</td>
													<td>{file.fileName}</td>
													<td>{file.fileDescription}</td>
													{/* <td>{file.fileType}</td> */}
													<td>{convertBytes(file.fileSize)}</td>
													<td>{moment.unix(file.uploadTime).format("h:mm:ss A M/D/Y")}</td>
													<td>
														<a
															href={"https://etherscan.io/address/" + file.uploader}
															rel="noopener noreferrer"
															target="_blank"
														>
															{file.uploader.substring(0, 10)}...
														</a>
													</td>
													<td>
														<a
															href={"https://ipfs.infura.io/ipfs/" + file.fileHash}
															rel="noopener noreferrer"
															target="_blank"
														>
															{file.fileHash.substring(0, 10)}...
														</a>
													</td>
													<td>
														<a
															className="mail-link"
															href={`mailto:JohnDoe@example.com?subject=File Safe link&body=Here's the link to the file: ${
																"https://ipfs.infura.io/ipfs/" + file.fileHash
															}`}
														>
															<i className="icon far fa-paper-plane"></i>
														</a>
													</td>
												</tr>
											</tbody>
										);
									})}
								</Table>

								{this.props.loading ? (
									<div id="loader" className="text-center mt-5">
										<Spinner animation="border" variant="primary" role="status" />
									</div>
								) : (
									""
								)}
							</div>
						</div>
					</main>
				</div>
			</div>
		);
	}
}

export default Main;
