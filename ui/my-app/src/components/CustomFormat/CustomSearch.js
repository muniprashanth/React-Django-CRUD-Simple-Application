import React, {useEffect, useState} from "react";
import { Form } from "react-bootstrap";

const CustomSearch = ({ searchTerm, setSearchTerm }) => {
    return (
        <Form.Control
            type="text"
            placeholder="Search"
            className="sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
    );
};

export default CustomSearch;
