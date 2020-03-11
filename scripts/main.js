var compound_transform;

// automatically called whenever any transform changes
function CalculateCompoundTransform(transforms) {
    // matrices in `transforms[i].mat4x4`
    // note `transform[0]` is first tranform to apply to vertex
    
    // if only one transform, set compound transform eequal to it
    // otherwise multiply all matrices together (in proper order)
    // `compound_transform = Matrix.multiply(...)`
    var tranform_matrices = [];

    if (transforms.length == 1) {
        compound_transform = transforms[0].mat4x4;
    } else {
        for (var i = 1; i < transforms.length; i++) {
            compound_transform = transforms[i];
            compound_transform = Matrix.multiply([compound_transform.mat4x4,transforms[i].mat4x4]); //matrix.multiply needs an array of matrices

        }
    }

    return compound_transform;
}

// automatically called whenever compound transform changes
function CalculateTransformedVertex(vertex) {
    // multiple vertex by compound_transform
    final_vertex = Matrix.multiply([vertex, compound_transform]);
    //var final_vertex = new Vector(4); // change / remove this
    return final_vertex;
}

// automatically called whenever user modifies a transform (changes type or values)
function ChangeTransform(index, type, values) {
    app.transforms[index].type = type;
    // update `app.transforms[index].mat4x4`
    // transform options: translate, scale, rotate_x, rotate_y, rotate_z
    if (type.equals("translate")) {                         //values[0], values[1], values[2]
        app.transforms[index].mat4x4 = Mat4x4Translate(app.transforms[index].mat4x4, values[0], values[1], values[2]);
    } else if (type.equals("scale")) {
        app.transforms[index].mat4x4 = Mat4x4Scale(app.transforms[index].mat4x4, values[0], values[1], values[2]);
    } else if (type.equals("rotate_x")) {
        app.transforms[index].mat4x4 = Mat4x4RotateX(app.transforms[index].mat4x4, values[0]);
    } else if (type.equals("rotate_y")) {
        app.transforms[index].mat4x4 = Mat4x4RotateY(app.transforms[index].mat4x4, values[0]);
    } else if (type.equals("rotate_z")) {
        app.transforms[index].mat4x4 = Mat4x4RotateZ(app.transforms[index].mat4x4, values[0]);
    }
    // recalculate compound transform and tranformed vertex
    app.compound = CalculateCompoundTransform(app.transforms);
    app.final_vertex = CalculateTransformedVertex(app.vertex);
}
