import React from 'react';

export interface FilterProps {
    title: string;
    options: string[];
}


export const AppFilterDropdown = ({ title, options }: FilterProps) => {
    return (
        <select className="ui dropdown">
            <option value="">{title}</option>
            {options.map((option: string, index: number) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </select>
    )
}

export const AppFilterVerticalMenu = () => {
    return (
        <div className="ui vertical menu">
  <div className="ui dropdown item">
    Categories
    <i className="dropdown icon"></i>
    <div className="menu">
      <a className="item">Electronics</a>
      <a className="item">Automotive</a>
      <a className="item">Home</a>
    </div>
  </div>
</div>
    )
}

export const AppFilterPopup = () => {
    return (
        <>
<div className="ui menu">
    <a className="browse item active">
        Browse
        <i className="dropdown icon"></i>
    </a>
</div>

<div className="ui fluid popup bottom left transition hidden">
  <div className="ui four column relaxed equal height divided grid">
    <div className="column">
      <h4 className="ui header">Fabrics</h4>
      <div className="ui link list">
        <a className="item">Cashmere</a>
        <a className="item">Linen</a>
        <a className="item">Cotton</a>
        <a className="item">Viscose</a>
      </div>
    </div>
    <div className="column">
      <h4 className="ui header">Size</h4>
      <div className="ui link list">
        <a className="item">Small</a>
        <a className="item">Medium</a>
        <a className="item">Large</a>
        <a className="item">Plus Sizes</a>
      </div>
    </div>
    <div className="column">
      <h4 className="ui header">Colored</h4>
      <div className="ui link list">
        <a className="item">Neutrals</a>
        <a className="item">Brights</a>
        <a className="item">Pastels</a>
      </div>
    </div>
    <div className="column">
      <h4 className="ui header">Types</h4>
      <div className="ui link list">
        <a className="item">Knitwear</a>
        <a className="item">Outerwear</a>
        <a className="item">Pants</a>
        <a className="item">Shoes</a>
      </div>
    </div>
  </div>
</div>
</>
    )
}
