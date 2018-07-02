//
// Autogenerated by Thrift Compiler (0.11.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
"use strict";

var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;


var ttypes = require('./bank_types');
//HELPER FUNCTIONS AND STRUCTURES

var AccountManagement_create_args = function(args) {
  this.data = null;
  if (args) {
    if (args.data !== undefined && args.data !== null) {
      this.data = new ttypes.Data(args.data);
    }
  }
};
AccountManagement_create_args.prototype = {};
AccountManagement_create_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.data = new ttypes.Data();
        this.data.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

AccountManagement_create_args.prototype.write = function(output) {
  output.writeStructBegin('AccountManagement_create_args');
  if (this.data !== null && this.data !== undefined) {
    output.writeFieldBegin('data', Thrift.Type.STRUCT, 1);
    this.data.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var AccountManagement_create_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = new ttypes.AccountInfo(args.success);
    }
  }
};
AccountManagement_create_result.prototype = {};
AccountManagement_create_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new ttypes.AccountInfo();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

AccountManagement_create_result.prototype.write = function(output) {
  output.writeStructBegin('AccountManagement_create_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var AccountManagementClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
};
AccountManagementClient.prototype = {};
AccountManagementClient.prototype.seqid = function() { return this._seqid; };
AccountManagementClient.prototype.new_seqid = function() { return this._seqid += 1; };
AccountManagementClient.prototype.create = function(data, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_create(data);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_create(data);
  }
};

AccountManagementClient.prototype.send_create = function(data) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('create', Thrift.MessageType.CALL, this.seqid());
  var params = {
    data: data
  };
  var args = new AccountManagement_create_args(params);
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

AccountManagementClient.prototype.recv_create = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new AccountManagement_create_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('create failed: unknown result');
};
var AccountManagementProcessor = exports.Processor = function(handler) {
  this._handler = handler;
}
;
AccountManagementProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}
;
AccountManagementProcessor.prototype.process_create = function(seqid, input, output) {
  var args = new AccountManagement_create_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.create.length === 1) {
    Q.fcall(this._handler.create.bind(this._handler), args.data)
      .then(function(result) {
        var result_obj = new AccountManagement_create_result({success: result});
        output.writeMessageBegin("create", Thrift.MessageType.REPLY, seqid);
        result_obj.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result;
        result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("create", Thrift.MessageType.EXCEPTION, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.create(args.data, function (err, result) {
      var result_obj;
      if ((err === null || typeof err === 'undefined')) {
        result_obj = new AccountManagement_create_result((err !== null || typeof err === 'undefined') ? err : {success: result});
        output.writeMessageBegin("create", Thrift.MessageType.REPLY, seqid);
      } else {
        result_obj = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("create", Thrift.MessageType.EXCEPTION, seqid);
      }
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
};
