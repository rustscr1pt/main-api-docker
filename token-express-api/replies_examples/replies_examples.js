function reply_with_message(condition, message) { // condition:bool, message:string
    return {
        is_succeed : condition,
        message : message
    }
}

function reply_with_serialized_struct(condition, message, json_reply) { // condition:bool, message:string, json_reply:Vec<JSON>
    return {
        is_succeed: condition,
        message: message,
        reply: json_reply
    }
}

module.exports = {reply_with_message, reply_with_serialized_struct};