var React = require('react');
var mui = require('material-ui');
var Dialog = mui.Dialog;


var NewDialog = React.createClass({

  onComponentDidMount: function() {
    console.log("here", this.refs.dialog);
    this.refs.dialog.dismiss();
  },

  render: function() {
    var standardActions = [
      { text: 'Cancel' },
      { text: 'Submit', onClick: this._onDialogSubmit }
    ];

    return (
      <Dialog
        ref="dialog"
        title="Create new insight"
        actions={standardActions}>

        <div> hey </div>

      </Dialog>

    );
  },

  show: function() {
    this.refs.dialog.show();
  },

  _onDialogSubmit: function() {
    this.refs.dialog.dismiss();
  }

});

module.exports = NewDialog;
