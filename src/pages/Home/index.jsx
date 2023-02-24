// libs
import React, { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import axios from "axios";
import { message, Spin } from "antd";
import "./styles.scss";

const Home = () => {
	const [nl, setNL] = useState("");
	const [code, setCode] = useState("");
	const [dataframe, setDataframe] = useState("");
	const [messageApi, contextHolder] = message.useMessage();
	const [prediction, setPrediction] = useState("");
	const [loading, setLoading] = useState(false);
	const handleSubmit = async () => {
		if (code === "") {
			messageApi.open({
				type: "warning",
				content: "Please enter local code context",
			});
			return;
		}
		const data = {
			natural_language: nl,
			local_code_context: code,
			dataframe_schema: dataframe,
		};
		setLoading(true);
		try {
			const res = await axios.post(
				"http://127.0.0.1:8000/api/infer/plotcoder/",
				data
			);
			if (res && res.data) {
				setPrediction(res.data.message);
			} else {
				setPrediction("");
			}
		} catch (error) {
			setPrediction("");
			message.warning("Please add your local code context");
		}
		setLoading(false);
	};
	return (
		<div className="home-wrapper">
			{loading && (
				<div
					style={{
						position: "absolute",
						zIndex: 10,
						top: "50%",
						right: 0,
						bottom: 0,
						left: "50%",
					}}
				>
					<Spin size="large" />
				</div>
			)}
			<div className="input-code-container-wrapper">
				{contextHolder}
				<form className="input-code-container-wrapper-inner">
					<div className="natural-language-input-wrapper">
						<div className="natural-language-input-label">Natural Language</div>
						<div className="natural-language-input" data-color-mode="dark">
							<CodeEditor
								value={nl}
								language="md"
								placeholder="Please enter natural language"
								onChange={(evn) => setNL(evn.target.value)}
								padding={15}
								style={{
									width: "100%",
									fontFamily:
										"ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
									fontSize: 13,
								}}
							/>
						</div>
					</div>
					<div className="natural-language-input-wrapper">
						<div className="natural-language-input-label">
							Local code context
						</div>
						<div className="natural-language-input" data-color-mode="dark">
							<CodeEditor
								value={code}
								language="py"
								placeholder="Please enter local code context"
								onChange={(evn) => setCode(evn.target.value)}
								padding={15}
								style={{
									width: "100%",
									fontFamily:
										"ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
									fontSize: 13,
								}}
							/>
						</div>
					</div>
					<div className="natural-language-input-wrapper">
						<div className="natural-language-input-label">Dataframe schema</div>
						<div className="data-frame-input" data-color-mode="dark">
							<CodeEditor
								value={dataframe}
								language="py"
								placeholder="Please enter dataframe schema"
								onChange={(evn) => setDataframe(evn.target.value)}
								padding={15}
								style={{
									width: "100%",
									fontFamily:
										"ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
									fontSize: 13,
								}}
							/>
						</div>
					</div>
					<div className="submit-button-wrapper">
						<div
							className="submit-button-wrapper-inner"
							disabled={loading}
							onClick={handleSubmit}
						>
							Submit
						</div>
					</div>
				</form>
			</div>
			<div className="prediction-wrapper">
				<div className="prediction-label">Prediction</div>
				<div className="prediction" data-color-mode="dark">
					<CodeEditor
						value={prediction}
						language="py"
						padding={15}
						disabled
						style={{
							width: "100%",
							fontFamily:
								"ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
							fontSize: 13,
						}}
					/>
				</div>
			</div>
			{/* <div className="prediction-wrapper">
				<div className="prediction-label">Ground Truth</div>
				<div className="prediction" data-color-mode="dark">
					<CodeEditor
						value={dataframe}
						language="py"
						padding={15}
						disabled
						style={{
							width: "100%",
							fontFamily:
								"ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
							fontSize: 13,
						}}
					/>
				</div>
			</div> */}
		</div>
	);
};

export default Home;
