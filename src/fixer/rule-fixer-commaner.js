import assert from "assert";

/**
 * Fix Command object has `range` and `text`.
 * @typedef {Object} FixCommand
 * @property {number[]} range range is an array of numbers : [start, end]
 * @property {string} text text is replace value.
 */
/**
 * Creates a fix command that inserts text at the specified index in the source text.
 * @param {int} index The 0-based index at which to insert the new text.
 * @param {string} text The text to insert.
 * @returns {FixCommand} The fix command.
 * @private
 */
function insertTextAt(index, text) {
    assert(text, "text must be string");
    return {
        range: [index, index],
        text
    };
}
/**
 * Creates code fixing commands for rules.
 * It create command for fixing texts.
 * @constructor
 */
export default class RuleFixer {
    /**
     * Creates a fix command that inserts text after the given node or token.
     * The fix is not applied until applyFixes() is called.
     * @param {TxtAST.TxtNode} node The node or token to insert after.
     * @param {string} text The text to insert.
     * @returns {FixCommand} The fix command.
     */
    insertTextAfter(node, text) {
        return this.insertTextAfterRange(node.range, text);
    }

    /**
     * Creates a fix command that inserts text after the specified range in the source text.
     * The fix is not applied until applyFixes() is called.
     * @param {int[]} range The range to replace, first item is start of range, second
     *      is end of range.
     * @param {string} text The text to insert.
     * @returns {FixCommand} The fix command.
     */
    insertTextAfterRange(range, text) {
        return insertTextAt(range[1], text);
    }

    /**
     * Creates a fix command that inserts text before the given node or token.
     * The fix is not applied until applyFixes() is called.
     * @param {TxtAST.TxtNode} node The node or token to insert before.
     * @param {string} text The text to insert.
     * @returns {FixCommand} The fix command.
     */
    insertTextBefore(node, text) {
        return this.insertTextBeforeRange(node.range, text);
    }

    /**
     * Creates a fix command that inserts text before the specified range in the source text.
     * The fix is not applied until applyFixes() is called.
     * @param {int[]} range The range to replace, first item is start of range, second
     *      is end of range.
     * @param {string} text The text to insert.
     * @returns {FixCommand} The fix command.
     */
    insertTextBeforeRange(range, text) {
        return insertTextAt(range[0], text);
    }

    /**
     * Creates a fix command that replaces text at the node or token.
     * The fix is not applied until applyFixes() is called.
     * @param {TxtAST.TxtNode} node The node or token to remove.
     * @param {string} text The text to insert.
     * @returns {FixCommand} The fix command.
     */
    replaceText(node, text) {
        return this.replaceTextRange(node.range, text);
    }

    /**
     * Creates a fix command that replaces text at the specified range in the source text.
     * The fix is not applied until applyFixes() is called.
     * @param {int[]} range The range to replace, first item is start of range, second
     *      is end of range.
     * @param {string} text The text to insert.
     * @returns {FixCommand} The fix command.
     */
    replaceTextRange(range, text) {
        return {
            range,
            text
        };
    }

    /**
     * Creates a fix command that removes the node or token from the source.
     * The fix is not applied until applyFixes() is called.
     * @param {TxtAST.TxtNode} node The node or token to remove.
     * @returns {FixCommand} The fix command.
     */
    remove(node) {
        return this.removeRange(node.range);
    }

    /**
     * Creates a fix command that removes the specified range of text from the source.
     * The fix is not applied until applyFixes() is called.
     * @param {int[]} range The range to remove, first item is start of range, second
     *      is end of range.
     * @returns {FixCommand} The fix command.
     */
    removeRange(range) {
        return {
            range,
            text: ""
        };
    }
}
