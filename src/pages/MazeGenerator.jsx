import { useState, useMemo, useEffect } from "react";
import { MazeLayout } from "#root/projects/maze-generator/MazeLayout";
import { MazeGenerationAlgorithms, MazeStatusEnum, generateGrid, getMazeBEInitialState, getMazeFEInitialState, mazeGenerationAlgorithmsToSelect } from "#root/projects/maze-generator/MazeUtils";
import { Slider, InputNumber, Select, ColorPicker } from "antd";

import "@/assets/css/pages/maze-generator.css"
import "@/assets/css/components.css"
import "@/assets/css/ant-components.css"

export const MazeGenerator = () => {
    const [mazeFEState, setMazeFEState] = useState(getMazeFEInitialState());
    const [mazeBEState, setMazeBEState] = useState(getMazeBEInitialState());
    const [algorithmModule, setAlgorithmModule] = useState(null);

    const algorithmsSelect = useMemo(() => mazeGenerationAlgorithmsToSelect(), []);

    useEffect(() => {
        const loadAlgorithmModule = async () => {
            const algorithmModule = await import(`#root/projects/maze-generator/algorithms/${mazeBEState.algorithm.filePath}.js`);
            setAlgorithmModule(algorithmModule);
        }

        loadAlgorithmModule();
    }, [mazeBEState.algorithm]);

    return (
        <div className="page">
            <div className="settings">
                <h2 className="headline">Settings</h2>
                <div className="settings-configuration-block">
                    <div className="algorithm">
                        <div className="setting-label">
                            Algorithm:
                        </div>
                        <div className="setting-value">
                            <Select
                                disabled={!isValidStatus(MazeStatusEnum.CREATED)}
                                value={mazeBEState.algorithm}
                                onChange={setAlgorithm}
                                options={algorithmsSelect}
                            />
                        </div>
                    </div>
                    <div className="grid-size">
                        <div className="setting-label">
                            Grid Size (2-60):
                        </div>
                        <div className="setting-value">
                            <InputNumber
                                disabled={!isValidStatus(MazeStatusEnum.CREATED)}
                                min={2}
                                max={60}
                                value={mazeFEState.rowsColsNumber}
                                onChange={handleGridSizeSettingUpdate}
                            />
                        </div>
                    </div>
                    <div className="delay">
                        <div className="setting-label">
                            Delay (ms):
                        </div>
                        <div className="setting-value">
                            <Slider
                                disabled={isValidStatus(MazeStatusEnum.STARTED)}
                                min={0}
                                max={2000}
                                onChange={handleDelaySettingUpdate}
                                value={mazeFEState.delay}
                            />
                            <InputNumber
                                disabled={isValidStatus(MazeStatusEnum.STARTED)}
                                min={0}
                                max={2000}
                                value={mazeFEState.delay}
                                onChange={handleDelaySettingUpdate}
                            />
                        </div>
                    </div>
                    <div className="current-cell-color">
                        <div className="setting-label">
                            Current Cell Color:
                        </div>
                        <div className="setting-value">
                            <ColorPicker
                                disabled={isValidStatus(MazeStatusEnum.STARTED) || isValidStatus(MazeStatusEnum.NEXT_FRAME)}
                                value={mazeFEState.currentCellColor}
                                onChange={setCurrentCellColor}
                            />
                        </div>
                    </div>
                    <div className="maze-background-color">
                        <div className="setting-label">
                            Maze Background Color:
                        </div>
                        <div className="setting-value">
                            <ColorPicker
                                disabled={isValidStatus(MazeStatusEnum.STARTED) || isValidStatus(MazeStatusEnum.NEXT_FRAME)}
                                value={mazeFEState.backgroundColor}
                                onChange={setMazeBackgroundColor}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-section" style={{ width: mazeFEState.width }}>
                <h2 className="headline">Maze Generator</h2>

                <div className="flow-buttons">
                    <button className="project-button" onClick={handleStartClick}>Start</button>
                    <button className="project-button" onClick={handleResetClick}>Reset</button>
                    <button className="project-button" onClick={handleStopClick}>Stop</button>
                    <button className="project-button" id="next-frame-button" onClick={handleNextFrameClick}>Next Frame</button>
                </div>

                <MazeLayout
                    state={{
                        mazeFEStateObj: {
                            mazeFEState,
                            utilFunctionsStateFE: {
                                setStartCell
                            }
                        },
                        mazeBEStateObj: {
                            mazeBEState,
                            utilFunctionsStateBE: {
                                isValidStatus,
                                getStatus,
                                setStatus,
                                resetGrid
                            }
                        }
                    }}
                    algorithmModule={algorithmModule}
                />
            </div>

            <div className="stack"></div>
        </div>
    );

    function setStartCell(rowNum, colNum) {
        setMazeFEState(prev => {
            return {
                ...prev,
                start: {
                    rowNum,
                    colNum
                }
            };
        });
    }

    function setCurrentCellColor(currentCellColor) {
        setMazeFEState(prev => {
            return {
                ...prev,
                currentCellColor: currentCellColor.toHexString()
            };
        });
    }

    function setMazeBackgroundColor(backgroundColor) {
        setMazeFEState(prev => {
            return {
                ...prev,
                backgroundColor: backgroundColor.toHexString()
            };
        });
    }

    function setMazeRowsCols(rowsColsNumber) {
        setMazeFEState(prev => {
            return {
                ...prev,
                rowsColsNumber
            };
        });
    }

    function setDelay(delay) {
        setMazeFEState(prev => {
            return {
                ...prev,
                delay
            };
        });
    }

    function isValidStatus(status) {
        return mazeBEState.status === status;
    }

    function getStatus() {
        return mazeBEState.status;
    }

    function setStatus(status) {
        setMazeBEState(prev => {
            return {
                ...prev,
                status: status
            }
        });
    }

    function resetGrid() {
        mazeBEState.grid = generateGrid(mazeFEState.rowsColsNumber)
    }

    function setGrid(rowsColsNumber) {
        setMazeBEState(prev => {
            return {
                ...prev,
                grid: generateGrid(rowsColsNumber)
            }
        });
    }

    function setAlgorithm(newAlgorithmKey) {
        setMazeBEState(prev => {
            return {
                ...prev,
                algorithm: MazeGenerationAlgorithms[newAlgorithmKey]
            }
        });
    }

    function handleStartClick() {
        if (!isValidStatus(MazeStatusEnum.CREATED) && !isValidStatus(MazeStatusEnum.STOPPED)) return;

        setStatus(MazeStatusEnum.STARTED);
    }

    function handleResetClick() {
        setMazeFEState(getMazeFEInitialState())
        setMazeBEState(getMazeBEInitialState())
    }

    function handleStopClick() {
        if (!isValidStatus(MazeStatusEnum.STARTED)) return;

        setStatus(MazeStatusEnum.STOPPED);
    }

    function handleNextFrameClick() {
        if (isValidStatus(MazeStatusEnum.FINISHED)) return;

        setStatus(MazeStatusEnum.NEXT_FRAME);
    }

    function handleGridSizeSettingUpdate(newRowColsValue) {
        if (newRowColsValue != null) {
            setMazeRowsCols(newRowColsValue);
            setGrid(newRowColsValue);
        }
    }

    function handleDelaySettingUpdate(newDelayValue) {
        setDelay(newDelayValue);
    }
}