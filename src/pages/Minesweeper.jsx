import "@/assets/css/pages/minesweeper.css"

function Minesweeper() {

    return (
        <div className="page">
            <div className="settings">
                {/* <h2 className="headline">Settings</h2>
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
                </div> */}
            </div>
            <div className="main-section" style={{ width: 800 }}>
                <h2 className="headline">Maze Generator</h2>

                {/* <div className="flow-buttons">
                    <button className="project-button" onClick={handleStartClick}>Start</button>
                    <button className="project-button" onClick={handleResetClick}>Reset</button>
                    <button className="project-button" onClick={handleStopClick}>Stop</button>
                    <button className="project-button" id="next-frame-button" onClick={handleNextFrameClick}>Next Frame</button>
                </div> */}

                {/* <MazeLayout
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
                /> */}
            </div>

            <div className="additional-information"></div>
        </div>
    );
}

export default Minesweeper