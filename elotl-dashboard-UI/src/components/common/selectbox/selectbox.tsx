import React from 'react';
import Select from 'react-select';
import './style.scss';


export interface ISelectboxProps {
    lable?: string;
    options?;
    onChange?: (selectedOption: any) => any;
    disable?: boolean
    selectedValue?;
}

export interface ISelectboxState {
    selectedOption: null,
}

class Selectbox extends React.Component<ISelectboxProps, ISelectboxState> {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: this.props.selectedValue,
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.selectedValue !== this.props.selectedValue) {
            this.setState({ selectedOption: this.props.selectedValue });
        }
    }

    handleChange(selectedOption) {
        this.props.onChange && this.props.onChange(selectedOption);
        this.setState(
            { selectedOption }
        );
    };
    render() {
        const { selectedOption } = this.state;
        return (
            <div className="selectbox">
                <label htmlFor="select">{this.props.lable}</label>
                <Select
                    value={selectedOption}
                    onChange={this.handleChange.bind(this)}
                    options={this.props.options}
                    className="select-box"
                    classNamePrefix="select-options"
                    isDisabled={this.props.disable}
                    theme={theme => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary25: '#E1FBF6',
                            primary: '#1BC172',
                        },
                    })}

                />
            </div>
        );
    }
}

export default Selectbox;