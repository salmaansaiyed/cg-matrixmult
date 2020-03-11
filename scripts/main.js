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
            compound_transform = Matrix.multiply(compound_transform.mat4x4,transforms[i].mat4x4);
        }
    }

    return compound_transform;
}

// automatically called whenever compound transform changes
function CalculateTransformedVertex(vertex) {
    // multiple vertex by compound_transform
    // `final_vertex = Matrix.multiply(...)`
    var final_vertex = new Vector(4); // change / remove this

    return final_vertex;
}

// automatically called whenever user modifies a transform (changes type or values)
function ChangeTransform(index, type, values) {
    app.transforms[index].type = type;
    // update `app.transforms[index].mat4x4`
    // transform options: translate, scale, rotate_x, rotate_y, rotate_z
    if (type.equals("translate")) {
        app.transforms[index].mat4x4 = Mat4x4Translate(mat4x4, tx, ty, tz);
    } else if (type.equals("scale")) {
        app.transforms[index].mat4x4 = Mat4x4Scale(mat4x4, sx, sy, sz);
    } else if (type.equals("rotate_x")) {
        app.transforms[index].mat4x4 = Mat4x4RotateX(mat4x4, theta);
    } else if (type.equals("rotate_y")) {
        app.transforms[index].mat4x4 = Mat4x4RotateY(mat4x4, theta);
    } else if (type.equals("rotate_z")) {
        app.transforms[index].mat4x4 = Mat4x4RotateZ(mat4x4, theta);
    }
    // recalculate compound transform and tranformed vertex
    app.compound = CalculateCompoundTransform(app.transforms);
    app.final_vertex = CalculateTransformedVertex(app.vertex);
}
