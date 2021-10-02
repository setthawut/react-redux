import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'

class SortIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortType: ""
        }
    }

    componentDidMount() {
        
    }

    onChangeSortingType() {
        var sortType = ""
        if (this.state.sortType == "") {
            this.setState({ sortType: "asc" })
            sortType = "asc"
        } else if (this.state.sortType == "asc") {
            this.setState({ sortType: "desc" })
            sortType = "desc"
        } else if (this.state.sortType == "desc") {
            this.setState({ sortType: "" })
        }

        this.props.onChangeSortingType(sortType)
    }

    render() {
        const { label, sortType } = this.props

        return (
            <a onClick={this.onChangeSortingType.bind(this)} style={{ cursor: "pointer" }}>
                {label} <FontAwesomeIcon icon={sortType == "" ? faSort : (sortType == "asc" ? faSortUp : faSortDown )} />
            </a>
        )
    }
}

export default SortIcon