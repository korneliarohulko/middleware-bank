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

var AccountService_getAccountInfo_args = function(args) {
  this.guid = null;
  if (args) {
    if (args.guid !== undefined && args.guid !== null) {
      this.guid = args.guid;
    }
  }
};
AccountService_getAccountInfo_args.prototype = {};
AccountService_getAccountInfo_args.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.I32) {
        this.guid = input.readI32();
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

AccountService_getAccountInfo_args.prototype.write = function(output) {
  output.writeStructBegin('AccountService_getAccountInfo_args');
  if (this.guid !== null && this.guid !== undefined) {
    output.writeFieldBegin('guid', Thrift.Type.I32, 1);
    output.writeI32(this.guid);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var AccountService_getAccountInfo_result = function(args) {
  this.success = null;
  this.authorizationException = null;
  if (args instanceof ttypes.AuthorizationException) {
    this.authorizationException = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = new ttypes.AccountInfo(args.success);
    }
    if (args.authorizationException !== undefined && args.authorizationException !== null) {
      this.authorizationException = args.authorizationException;
    }
  }
};
AccountService_getAccountInfo_result.prototype = {};
AccountService_getAccountInfo_result.prototype.read = function(input) {
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
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.authorizationException = new ttypes.AuthorizationException();
        this.authorizationException.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

AccountService_getAccountInfo_result.prototype.write = function(output) {
  output.writeStructBegin('AccountService_getAccountInfo_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  if (this.authorizationException !== null && this.authorizationException !== undefined) {
    output.writeFieldBegin('authorizationException', Thrift.Type.STRUCT, 1);
    this.authorizationException.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var AccountServiceClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
};
AccountServiceClient.prototype = {};
AccountServiceClient.prototype.seqid = function() { return this._seqid; };
AccountServiceClient.prototype.new_seqid = function() { return this._seqid += 1; };
AccountServiceClient.prototype.getAccountInfo = function(guid, callback) {
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
    this.send_getAccountInfo(guid);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_getAccountInfo(guid);
  }
};

AccountServiceClient.prototype.send_getAccountInfo = function(guid) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getAccountInfo', Thrift.MessageType.CALL, this.seqid());
  var params = {
    guid: guid
  };
  var args = new AccountService_getAccountInfo_args(params);
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

AccountServiceClient.prototype.recv_getAccountInfo = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new AccountService_getAccountInfo_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.authorizationException) {
    return callback(result.authorizationException);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getAccountInfo failed: unknown result');
};
var AccountServiceProcessor = exports.Processor = function(handler) {
  this._handler = handler;
}
;
AccountServiceProcessor.prototype.process = function(input, output) {
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
AccountServiceProcessor.prototype.process_getAccountInfo = function(seqid, input, output) {
  var args = new AccountService_getAccountInfo_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.getAccountInfo.length === 1) {
    Q.fcall(this._handler.getAccountInfo.bind(this._handler), args.guid)
      .then(function(result) {
        var result_obj = new AccountService_getAccountInfo_result({success: result});
        output.writeMessageBegin("getAccountInfo", Thrift.MessageType.REPLY, seqid);
        result_obj.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result;
        if (err instanceof ttypes.AuthorizationException) {
          result = new AccountService_getAccountInfo_result(err);
          output.writeMessageBegin("getAccountInfo", Thrift.MessageType.REPLY, seqid);
        } else {
          result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
          output.writeMessageBegin("getAccountInfo", Thrift.MessageType.EXCEPTION, seqid);
        }
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.getAccountInfo(args.guid, function (err, result) {
      var result_obj;
      if ((err === null || typeof err === 'undefined') || err instanceof ttypes.AuthorizationException) {
        result_obj = new AccountService_getAccountInfo_result((err !== null || typeof err === 'undefined') ? err : {success: result});
        output.writeMessageBegin("getAccountInfo", Thrift.MessageType.REPLY, seqid);
      } else {
        result_obj = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getAccountInfo", Thrift.MessageType.EXCEPTION, seqid);
      }
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
};
